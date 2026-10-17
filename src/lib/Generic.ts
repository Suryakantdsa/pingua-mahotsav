import { NextRequest, NextResponse } from "next/server";
import { Model, Types, Error as MongooseError } from "mongoose";
import dbConnect from "./mongoose";

function buildQuery(searchParams: URLSearchParams): Record<string, any> {
  const query: Record<string, any> = {};

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("$")) {
      continue;
    }

    // Handle $in operator
    const inMatch = key.match(/(.+)\[\$in\]/);
    if (inMatch) {
      const field = inMatch[1];
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);
      const processedValues = values.map((v) =>
        !isNaN(Number(v)) && v.trim() !== "" ? Number(v) : v,
      );
      query[field] = { $in: processedValues };
      continue;
    }

    // Handle $nin operator (not in)
    const ninMatch = key.match(/(.+)\[\$nin\]/);
    if (ninMatch) {
      const field = ninMatch[1];
      const values = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);
      const processedValues = values.map((v) =>
        !isNaN(Number(v)) && v.trim() !== "" ? Number(v) : v,
      );
      query[field] = { $nin: processedValues };
      continue;
    }

    // Handle comparison operators
    const comparisonMatch = key.match(/(.+)\[\$(gt|gte|lt|lte|ne)\]/);
    if (comparisonMatch) {
      const field = comparisonMatch[1];
      const operator = `$${comparisonMatch[2]}`;
      const numValue =
        !isNaN(Number(value)) && value.trim() !== "" ? Number(value) : value;
      query[field] = { [operator]: numValue };
      continue;
    }

    // Handle search parameters
    const searchMatch = key.match(/(.+)\[\$search\]/);
    if (searchMatch) {
      query[searchMatch[1]] = { $regex: value, $options: "i" };
      continue;
    }

    // Handle boolean values
    if (value.toLowerCase() === "true") {
      query[key] = true;
    } else if (value.toLowerCase() === "false") {
      query[key] = false;
    }
    // Handle numeric values
    else if (!isNaN(Number(value)) && value.trim() !== "") {
      query[key] = Number(value);
    } else {
      query[key] = value;
    }
  }

  return query;
}

function buildPopulate(searchParams: URLSearchParams): string[] {
  const populate: string[] = [];

  // Handle single populate field
  const singlePopulate = searchParams.get("$populate");
  if (singlePopulate) {
    return [singlePopulate];
  }

  // Handle multiple populate fields with array syntax
  for (const [key, value] of searchParams.entries()) {
    const populateMatch = key.match(/\$populate\[(\d+)\]/);
    if (populateMatch && value) {
      const index = parseInt(populateMatch[1]);
      populate[index] = value;
    }
  }

  // Filter out undefined values and return
  return populate.filter((field): field is string => field !== undefined);
}

function buildSort(searchParams: URLSearchParams): Record<string, 1 | -1> {
  const sort: Record<string, 1 | -1> = {};

  for (const [key, value] of searchParams.entries()) {
    const sortMatch = key.match(/\$sort\[(.+)\]/);
    if (sortMatch) {
      const field = sortMatch[1];
      const sortValue = parseInt(value);
      sort[field] = sortValue === 1 ? 1 : -1;
    }
  }

  return Object.keys(sort).length > 0 ? sort : { createdAt: -1 };
}

function buildSearchQuery(searchParams: URLSearchParams): Record<string, any> {
  const searchConditions: Record<string, any>[] = [];

  for (const [key, value] of searchParams.entries()) {
    console.log(key, value);
    const searchMatch = key.match(/\$search\[(.+)\]/);
    if (searchMatch && value.trim() !== "") {
      const field = searchMatch[1];
      searchConditions.push({
        [field]: { $regex: value, $options: "i" },
      });
    }
  }

  if (searchConditions.length > 0) {
    return { $or: searchConditions };
  }

  return {};
}

class GenericController<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // CREATE
  async POST(request: NextRequest) {
    try {
      await dbConnect();

      const body = await request.json();

      // Validate request body
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
          { error: "Request body is required" },
          { status: 400 },
        );
      }

      const doc = await this.model.create(body);

      return NextResponse.json(doc, { status: 201 });
    } catch (error: any) {
      console.error("GenericController POST error:", error);

      // Handle Mongoose validation errors
      if (error instanceof MongooseError.ValidationError) {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        return NextResponse.json(
          {
            error: "Validation failed",
            details: messages,
          },
          { status: 400 },
        );
      }

      // Handle duplicate key errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0];
        return NextResponse.json(
          {
            error: "Duplicate entry",
            message: `${field} already exists`,
          },
          { status: 409 },
        );
      }

      // Handle JSON parsing errors
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { error: "Invalid JSON in request body" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to create document",
          message: error.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  }

  // LIST or DETAILS
  async GET(request: NextRequest, params?: { id?: string }) {
    try {
      await dbConnect();

      const id = params?.id;

      // Single document by id
      if (id) {
        if (!Types.ObjectId.isValid(id)) {
          return NextResponse.json(
            { error: "Invalid ID format" },
            { status: 400 },
          );
        }

        // Build populate for single document
        const { searchParams } = new URL(request.url);
        const populateFields = buildPopulate(searchParams);

        let query = this.model.findById(id).select("-__v");

        // Apply populate if specified
        if (populateFields.length > 0) {
          populateFields.forEach((field: string) => {
            query = query.populate(field);
          });
        }

        const doc = await query.lean();

        if (!doc) {
          return NextResponse.json(
            { error: "data not found" },
            { status: 404 },
          );
        }

        return NextResponse.json(doc, { status: 200 });
      }

      // List with pagination/filter
      const { searchParams } = new URL(request.url);
      const limit = parseInt(searchParams.get("$limit") || "50");
      const skip = parseInt(searchParams.get("$skip") || "0");

      // Validate pagination parameters
      if (limit < -1 || skip < 0) {
        return NextResponse.json(
          { error: "Invalid pagination parameters" },
          { status: 400 },
        );
      }

      const query = buildQuery(searchParams);
      const populateFields = buildPopulate(searchParams);
      const sort = buildSort(searchParams);
      const searchQuery = buildSearchQuery(searchParams);

      // Combine regular query with search query
      const finalQuery: Record<string, any> = {
        ...query,
        ...searchQuery,
      };

      // Return all documents if limit is -1
      if (limit === -1) {
        let docsQuery = this.model.find(finalQuery).select("-__v").sort(sort);

        // Apply populate if specified
        if (populateFields.length > 0) {
          populateFields.forEach((field: string) => {
            docsQuery = docsQuery.populate(field);
          });
        }

        const docs = await docsQuery.lean();
        return NextResponse.json(docs, { status: 200 });
      }

      // Paginated response
      let docsQuery = this.model
        .find(finalQuery)
        .select("-__v")
        .sort(sort)
        .skip(skip)
        .limit(limit);

      // Apply populate if specified
      if (populateFields.length > 0) {
        populateFields.forEach((field: string) => {
          docsQuery = docsQuery.populate(field);
        });
      }
      // console.log("docsQuery............", docsQuery.toString());

      const [docs, total] = await Promise.all([
        docsQuery.lean(),
        this.model.countDocuments(finalQuery),
      ]);

      return NextResponse.json(
        {
          total,
          skip,
          limit,
          data: docs,
        },
        { status: 200 },
      );
    } catch (error: any) {
      console.error("GenericController GET error:", error);

      return NextResponse.json(
        {
          error: "Failed to fetch documents",
          message: error.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  }

  // UPDATE
  async PATCH(request: NextRequest, params?: { id?: string }) {
    try {
      await dbConnect();

      const id = params?.id;

      if (!id || !Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid ID format" },
          { status: 400 },
        );
      }

      const body = await request.json();

      // Validate request body
      if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
          { error: "Request body is required" },
          { status: 400 },
        );
      }

      const updated = await this.model
        .findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
        .lean();

      if (!updated) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
      console.error("GenericController PATCH error:", error);

      // Handle Mongoose validation errors
      if (error instanceof MongooseError.ValidationError) {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message,
        );
        return NextResponse.json(
          {
            error: "Validation failed",
            details: messages,
          },
          { status: 400 },
        );
      }

      // Handle duplicate key errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0];
        return NextResponse.json(
          {
            error: "Duplicate entry",
            message: `${field} already exists`,
          },
          { status: 409 },
        );
      }

      // Handle JSON parsing errors
      if (error instanceof SyntaxError) {
        return NextResponse.json(
          { error: "Invalid JSON in request body" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to update document",
          message: error.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  }

  // DELETE
  async DELETE(_request: NextRequest, params?: { id?: string }) {
    try {
      await dbConnect();

      const id = params?.id;

      if (!id || !Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: "Invalid ID format" },
          { status: 400 },
        );
      }

      const deleted = await this.model.findByIdAndDelete(id);

      if (!deleted) {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Document deleted successfully",
        },
        { status: 200 },
      );
    } catch (error: any) {
      console.error("GenericController DELETE error:", error);

      return NextResponse.json(
        {
          error: "Failed to delete document",
          message: error.message || "Internal server error",
        },
        { status: 500 },
      );
    }
  }
}

export default GenericController;
