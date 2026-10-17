// components/shared/TanStackCrudTable.tsx
"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  IconSearch,
  IconPlus,
  IconTrash,
  IconEdit,
  IconEye,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconCheck,
  IconX,
  IconFilter,
  IconColumns,
} from "@tabler/icons-react";
import apiClient from "@/restApp/apiClient";
import toast from "react-hot-toast";
import StatusDropdown from "./StatusDropdown";

export interface CrudFormField {
  key: string;
  heading: string;
  type: "text" | "number" | "email" | "phone" | "select" | "checkbox" | "textarea" | "date" | "image" | "password";
  required?: boolean;
  options?: string[]; // For select type
  gridSpan?: number; // 1, 2, 3, etc. (Default is 1)
  placeholder?: string;
  shouldShowInTable?: boolean;
}

interface TanStackCrudTableProps<TData extends Record<string, any>> {
  apiEndpoint: string;
  fields: CrudFormField[];
  title: string;
  searchableFields: string[];
  customActions?: (item: TData) => React.ReactNode;
  onView?: (item: TData) => void;
  shouldAdd?: boolean;
  shouldEdit?: boolean;
  shouldDelete?: boolean;
  shouldView?: boolean;
  rowsPerPageDefault?: number;
  statusFilterField?: string;
  statusFilterOptions?: string[];
}

const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

function CustomSelect({
  defaultValue,
  options,
  placeholder = "Select option...",
  name,
}: {
  defaultValue?: string;
  options: string[];
  placeholder?: string;
  name?: string;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <input type="hidden" name={name} value={value} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-slate-800 cursor-pointer text-left text-xs"
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <IconChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 z-50 w-full bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 max-h-60 overflow-y-auto animate-enter">
          {placeholder && (
            <button
              type="button"
              onClick={() => {
                setValue("");
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-slate-400 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              {placeholder}
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setValue(opt);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                value === opt ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{opt}</span>
              {value === opt && <IconCheck size={14} className="text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageUploadInput({
  name,
  defaultValue,
  placeholder = "Upload image or enter GCP URL...",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setUrl(defaultValue || "");
  }, [defaultValue]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading image to GCP bucket...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      setUrl(data.url);
      toast.success("Image uploaded successfully!", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image", { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      {url && (
        <div className="relative inline-block group">
          <img
            src={url}
            alt="Preview"
            className="h-20 w-20 rounded-2xl object-cover border-2 border-blue-200 shadow-sm"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-1 shadow hover:bg-rose-600 transition-all cursor-pointer"
            title="Remove image"
          >
            <IconX size={12} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <label className="flex items-center justify-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0">
          <IconPlus size={14} />
          <span>{isUploading ? "Uploading..." : "Upload File"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 placeholder-slate-400"
        />
      </div>
    </div>
  );
}

function PaginationSizeSelect({
  value,
  onChange,
  options,
}: {
  value: number;
  onChange: (val: number) => void;
  options: number[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1.5 border border-slate-200 bg-white rounded-lg pl-3 pr-2.5 py-1 text-slate-700 hover:bg-slate-50 focus:outline-none cursor-pointer font-bold text-xs"
      >
        <span>{value} rows</span>
        <IconChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1.5 z-40 bg-white border border-slate-100 rounded-lg shadow-xl py-1 min-w-[90px] animate-enter">
          {options.map((size) => (
            <button
              key={size}
              onClick={() => {
                onChange(size);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                value === size ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{size}</span>
              {value === size && <IconCheck size={10} className="text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TanStackCrudTable<TData extends Record<string, any>>({
  apiEndpoint,
  fields,
  title,
  searchableFields,
  customActions,
  onView,
  shouldAdd = true,
  shouldEdit = true,
  shouldDelete = true,
  shouldView = true,
  rowsPerPageDefault = 5,
  statusFilterField = "status",
  statusFilterOptions = ["pending", "approved", "rejected", "active", "inactive"],
}: TanStackCrudTableProps<TData>) {
  // Table States
  const [data, setData] = useState<TData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [statusTab, setStatusTab] = useState("all");

  // TanStack Controlled States
  const [sorting, setSorting] = useState<SortingState>([]);

  // Initialize visibility state based on shouldShowInTable flag
  const initialVisibility = useMemo(() => {
    const visibilityObj: Record<string, boolean> = {};
    fields.forEach((field) => {
      if (field.shouldShowInTable === false) {
        visibilityObj[field.key] = false;
      } else {
        visibilityObj[field.key] = true;
      }
    });
    return visibilityObj;
  }, [fields]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);

  // Sync column visibility state if fields prop changes
  useEffect(() => {
    const visibilityObj: Record<string, boolean> = {};
    fields.forEach((field) => {
      if (field.shouldShowInTable === false) {
        visibilityObj[field.key] = false;
      } else {
        visibilityObj[field.key] = true;
      }
    });
    setColumnVisibility(visibilityObj);
  }, [fields]);

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: rowsPerPageDefault,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  // UI Dropdown States
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isColumnsDropdownOpen, setIsColumnsDropdownOpen] = useState(false);

  // CRUD Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<TData | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Role Permissions: only super_admin and admin have delete and edit control; rest view only
  const [currentUserRole, setCurrentUserRole] = useState<string>("super_admin");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminObj = parsed.admin || parsed.user;
        if (adminObj?.role) {
          setCurrentUserRole(String(adminObj.role));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const hasWriteControl = currentUserRole === "super_admin" || currentUserRole === "admin";
  const effectiveShouldAdd = shouldAdd && hasWriteControl;
  const effectiveShouldEdit = shouldEdit && hasWriteControl;
  const effectiveShouldDelete = shouldDelete && hasWriteControl;

  // Refs for closing dropdowns on click outside
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const columnsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
      if (columnsDropdownRef.current && !columnsDropdownRef.current.contains(event.target as Node)) {
        setIsColumnsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Data from Backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const params: Record<string, any> = {
        $limit: pagination.pageSize,
        $skip: pagination.pageIndex * pagination.pageSize,
      };

      // Apply Status tab filter
      if (statusTab !== "all") {
        params[statusFilterField] = statusTab;
      }

      // Add Search Query
      if (globalFilter && searchableFields.length > 0) {
        searchableFields.forEach((field) => {
          params[`$search[${field}]`] = globalFilter;
        });
      }

      // Add Sorting Query
      if (sorting.length > 0) {
        const sortField = sorting[0].id;
        const sortDirection = sorting[0].desc ? -1 : 1;
        params[`$sort[${sortField}]`] = sortDirection;
      }

      const response = await apiClient.service(apiEndpoint).find({ query: params });
      setData(response.data || []);
      setTotalCount(response.total || response.data?.length || 0);
    } catch (err: any) {
      console.error("Fetch Data Error:", err);
      toast.error(err?.message || "Failed to retrieve records.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = useDebounce(fetchData, 400);

  // Trigger data fetching on controlled state changes
  useEffect(() => {
    debouncedFetchData();
  }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter, statusTab, apiEndpoint]);

  const refreshData = () => {
    fetchData();
  };

  // Columns Definition
  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    // Custom checkbox selection column
    cols.push({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            aria-label="Select all rows"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    });

    // Data Columns from fields definition
    fields.forEach((field) => {
      cols.push({
        id: field.key,
        accessorKey: field.key,
        header: field.heading,
        cell: (info) => {
          const val = info.row.original[field.key];
          
          if (field.type === "password") {
            return <span className="font-mono text-slate-400">••••••••</span>;
          }
          if (field.type === "image") {
            return val ? (
              <img
                src={String(val)}
                alt={field.heading}
                className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-xs"
              />
            ) : (
              <span className="text-slate-400 italic text-xs">No image</span>
            );
          }
          if (field.type === "checkbox") {
            return (
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${val ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {val ? "Yes" : "No"}
              </span>
            );
          }
          if (field.type === "date" && val) {
            return new Date(val as string).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
          }
          if (typeof val === "number" && (field.key.toLowerCase().includes("charge") || field.key.toLowerCase().includes("fee") || field.key.toLowerCase().includes("package"))) {
            return `₹${val.toLocaleString("en-IN")}`;
          }
          if (field.key === "status" && typeof val === "string") {
            const statusColors: Record<string, string> = {
              active: "bg-green-50 border-green-200 text-green-700",
              approved: "bg-green-50 border-green-200 text-green-700",
              pending: "bg-amber-50 border-amber-200 text-amber-700",
              review: "bg-amber-50 border-amber-200 text-amber-700",
              rejected: "bg-red-50 border-red-200 text-red-700",
              inactive: "bg-slate-50 border-slate-200 text-slate-600",
            };
            const colorClass = statusColors[val.toLowerCase()] || "bg-slate-50 text-slate-600";
            return (
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${colorClass}`}>
                {val}
              </span>
            );
          }
          
          // Bold primary field (Full Name)
          if (field.key === "fullName") {
            return <span className="font-bold text-slate-900 text-sm">{String(val ?? "")}</span>;
          }

          return <span className="text-slate-700 font-semibold">{String(val ?? "")}</span>;
        },
      });
    });

    // Actions Column
    if (effectiveShouldEdit || effectiveShouldDelete || shouldView || customActions) {
      cols.push({
        id: "actions",
        header: () => <div className="text-right pr-2">Actions</div>,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center justify-end gap-1 pr-1">
              {customActions && customActions(item)}
              {shouldView && (
                <button
                  onClick={() => {
                    if (onView) {
                      onView(item);
                    } else {
                      setActiveItem(item);
                      setIsViewOpen(true);
                    }
                  }}
                  className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="View Details"
                >
                  <IconEye size={16} />
                </button>
              )}
              {effectiveShouldEdit && (
                <button
                  onClick={() => {
                    setActiveItem(item);
                    setIsFormOpen(true);
                  }}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-900 rounded-lg transition-colors cursor-pointer"
                  title="Edit Record"
                >
                  <IconEdit size={16} />
                </button>
              )}
              {effectiveShouldDelete && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 hover:text-rose-900 rounded-lg transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <IconTrash size={16} />
                </button>
              )}
            </div>
          );
        },
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [fields, shouldEdit, shouldDelete, shouldView, customActions, onView]);

  // Table Setup
  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    getRowId: (row) => row._id,
  });

  // Handle Delete Operation
  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    const targetId = deleteTargetId;
    try {
      setIsDeleting(true);
      await apiClient.service(apiEndpoint).remove(targetId);
      toast.success("Record deleted successfully.");
      setDeleteTargetId(null);
      refreshData();
    } catch (err: any) {
      console.error("Delete Error:", err);
      const exactMsg = typeof err === "string" ? err : err?.error || err?.message || "Failed to delete record.";
      toast.error(exactMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Form Field Validation
  const validateForm = (formData: Record<string, any>) => {
    const errors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.key]) {
        errors[field.key] = `${field.heading} is required`;
      }
      if (field.type === "email" && formData[field.key]) {
        const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData[field.key]);
        if (!isValid) {
          errors[field.key] = "Please enter a valid email address";
        }
      }
      if (field.type === "phone" && formData[field.key]) {
        const isValid = /^\+?[\d\s\-()]{10,}$/.test(formData[field.key]);
        if (!isValid) {
          errors[field.key] = "Please enter a valid contact number";
        }
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formDataObj = new FormData(formEl);
    const body: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.type === "checkbox") {
        body[field.key] = formDataObj.get(field.key) === "on";
      } else if (field.type === "number") {
        const val = formDataObj.get(field.key);
        body[field.key] = val ? Number(val) : undefined;
      } else {
        body[field.key] = formDataObj.get(field.key);
      }
    });

    if (!validateForm(body)) return;

    try {
      setIsSubmitting(true);
      const service = apiClient.service(apiEndpoint);
      if (activeItem) {       
       // Use patch for updates as update method may not be defined in the service type
        await service.patch(activeItem._id, body);
        toast.success("Record updated successfully.");
      } else {
        await service.create(body);
        toast.success("Record created successfully.");
      }
      setIsFormOpen(false);
      setActiveItem(null);
      setFormErrors({});
      refreshData();
    } catch (err: any) {
      console.error("Save Error:", err);
      toast.error(err?.message || "Failed to save record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRowsCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col bg-white p-4 sm:p-6 gap-6 rounded-3xl shadow-lg border border-slate-100 select-none max-w-full overflow-hidden">
      
      {/* Top Header Section: Title & Actions Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
          <span className="bg-slate-100 border border-slate-200 text-slate-600 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {totalCount} Total
          </span>
        </div>

        {/* Reorganized Search, Add Record, Filters, and Columns Visibility */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          
          {/* Search bar + Add Record Grouped together */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 text-xs border border-slate-200 bg-slate-50/50 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-semibold text-slate-800 transition-all placeholder-slate-400"
              />
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Add Record button right next to Search bar */}
            {effectiveShouldAdd && (
              <button
                onClick={() => {
                  setActiveItem(null);
                  setFormErrors({});
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl px-4 py-2.5 text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer transition-all active:scale-[0.98] shrink-0"
              >
                <IconPlus size={14} />
                Add
              </button>
            )}
          </div>

          {/* Action Popups (Filters & Columns) */}
          <div className="flex items-center gap-2 justify-end">
            
            {/* Filter Dropdown Modal Trigger */}
            <div className="relative" ref={filterDropdownRef}>
              <button
                onClick={() => {
                  setIsFilterDropdownOpen(!isFilterDropdownOpen);
                  setIsColumnsDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold cursor-pointer transition-colors ${
                  statusTab !== "all" ? "bg-blue-50 border-blue-200 text-blue-600" : ""
                }`}
              >
                <IconFilter size={14} className={statusTab !== "all" ? "text-blue-500" : "text-slate-400"} />
                Filter: <span className="capitalize">{statusTab}</span>
                <IconChevronDown size={12} className={`transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute right-0 mt-2 z-40 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 space-y-1.5 animate-enter">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                    Filter by Status
                  </div>
                  <button
                    onClick={() => {
                      setStatusTab("all");
                      setIsFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      statusTab === "all" ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    All Statuses
                  </button>
                  {statusFilterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setStatusTab(opt);
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-colors ${
                        statusTab === opt ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Column Visibility Dropdown Modal Trigger */}
            <div className="relative" ref={columnsDropdownRef}>
              <button
                onClick={() => {
                  setIsColumnsDropdownOpen(!isColumnsDropdownOpen);
                  setIsFilterDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold cursor-pointer transition-colors"
              >
                <IconColumns size={14} className="text-slate-400" />
                Columns
                <IconChevronDown size={12} className={`transition-transform duration-200 ${isColumnsDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isColumnsDropdownOpen && (
                <div className="absolute right-0 mt-2 z-40 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 space-y-1.5 max-h-64 overflow-y-auto animate-enter">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                    Visible Columns
                  </div>
                  {table.getAllLeafColumns().map((column) => {
                    if (column.id === "select" || column.id === "actions") return null;
                    const fieldDef = fields.find((f) => f.key === column.id);
                    const heading = fieldDef ? fieldDef.heading : column.id;
                    return (
                      <label
                        key={column.id}
                        className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        {heading}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Row Selection Status bar (Hidden if nothing is selected) */}
      {selectedRowsCount > 0 && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-2xl text-xs font-bold text-blue-700 animate-enter">
          <span>{selectedRowsCount} rows selected out of {totalCount} records</span>
          <button
            onClick={() => table.resetRowSelection()}
            className="text-blue-500 hover:text-blue-800 transition-colors uppercase tracking-wider text-[10px]"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Table Data Grid Card */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden relative shadow-sm max-w-full">
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center backdrop-blur-[1px]">
            <div className="text-center space-y-2">
              <IconLoader2 size={32} className="animate-spin text-blue-600 mx-auto" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Querying Records...</p>
            </div>
          </div>
        )}

        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-slate-200 bg-slate-50/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3.5 px-5 text-slate-500 font-bold uppercase tracking-wider text-[10px] select-none cursor-pointer hover:bg-slate-100/80 transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() ? (
                          <span className="text-blue-600 font-bold text-xs">
                            {header.column.getIsSorted() === "desc" ? " ↓" : " ↑"}
                          </span>
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50/30 transition-colors ${row.getIsSelected() ? "bg-blue-50/20" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3.5 px-5 whitespace-nowrap align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-48 text-center bg-slate-50/30">
              <div className="text-3xl">📭</div>
              <h3 className="text-sm font-bold text-slate-800 mt-2">No data found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                {globalFilter ? "Try adjusting your search criteria." : "No records available."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Layout Widgets (Filter cards & Page Controls) */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 pt-2">
        {/* Three Filtered / Sorted / Selected Cards */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Filtered Card */}
          <div className="bg-blue-50/30 border border-blue-100/50 rounded-xl px-4 py-2 text-xs min-w-[120px] shadow-xs">
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block">Filtered</span>
            <span className="font-bold text-slate-900 mt-1 block">
              {globalFilter ? `"${globalFilter}"` : "all rows"}
            </span>
          </div>

          {/* Sorted Card */}
          <div className="bg-blue-50/30 border border-blue-100/50 rounded-xl px-4 py-2 text-xs min-w-[120px] shadow-xs">
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block">Sorted</span>
            <span className="font-bold text-slate-900 mt-1 block truncate max-w-[120px]">
              {sorting.length > 0 ? `${sorting[0].id} (${sorting[0].desc ? "desc" : "asc"})` : "none"}
            </span>
          </div>

          {/* Selected Card */}
          <div className="bg-blue-50/30 border border-blue-100/50 rounded-xl px-4 py-2 text-xs min-w-[120px] shadow-xs">
            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block">Selected</span>
            <span className="font-bold text-slate-900 mt-1 block">
              {selectedRowsCount} rows
            </span>
          </div>
        </div>

        {/* Page size controller and arrow navigations */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-6 text-xs font-semibold text-slate-500 self-stretch lg:self-auto">
          {/* Row count list */}
          <div className="flex items-center gap-1.5">
            <span>Show</span>
            <PaginationSizeSelect
              value={pagination.pageSize}
              onChange={(size) => {
                setPagination((prev) => ({
                  pageIndex: 0,
                  pageSize: size,
                }));
              }}
              options={[5, 10, 20, 30, 40, 50]}
            />
          </div>

          {/* Pagination Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed font-bold transition-all select-none"
            >
              Prev
            </button>
            <span className="text-slate-700 min-w-12 text-center">
              <span className="font-bold">{pagination.pageIndex + 1}</span> /{" "}
              <span className="font-bold">{table.getPageCount() || 1}</span>
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed font-bold transition-all select-none"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* CRUD Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="fixed inset-0" onClick={() => setIsFormOpen(false)} />
          
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col z-10 relative overflow-hidden animate-enter">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-base font-bold text-slate-800">
                {activeItem ? `Edit ${title} Entry` : `Add New ${title}`}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Modal Form fields */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map((field) => {
                  const defaultValue = activeItem ? activeItem[field.key] : "";
                  const spanClass = field.gridSpan ? `sm:col-span-${field.gridSpan}` : "";

                  return (
                    <div key={field.key} className={`space-y-1.5 text-xs ${spanClass}`}>
                      <label className="block font-bold text-slate-700">
                        {field.heading} {field.required && <span className="text-rose-500">*</span>}
                      </label>
                      
                      {field.type === "image" ? (
                        <ImageUploadInput
                          name={field.key}
                          defaultValue={defaultValue}
                          placeholder={field.placeholder}
                        />
                      ) : field.type === "select" ? (
                        <CustomSelect
                          name={field.key}
                          defaultValue={defaultValue}
                          options={field.options || []}
                          placeholder={`Select ${field.heading.toLowerCase()}...`}
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2.5 py-2.5">
                          <input
                            type="checkbox"
                            name={field.key}
                            defaultChecked={!!defaultValue}
                            className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="font-semibold text-slate-600">Toggle enabled/active</span>
                        </div>
                      ) : field.type === "textarea" ? (
                        <textarea
                          name={field.key}
                          defaultValue={defaultValue}
                          placeholder={field.placeholder || `Enter ${field.heading.toLowerCase()}...`}
                          rows={3}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-slate-800 placeholder-slate-400"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.key}
                          defaultValue={field.type === "date" && defaultValue ? new Date(defaultValue).toISOString().split("T")[0] : defaultValue}
                          placeholder={field.placeholder || `Enter ${field.heading.toLowerCase()}...`}
                          className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-semibold text-slate-800 placeholder-slate-400"
                        />
                      )}
                      {formErrors[field.key] && (
                        <p className="text-[11px] font-semibold text-rose-500">{formErrors[field.key]}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Form Actions Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-750 text-white rounded-xl px-5 py-2 text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <IconLoader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CRUD View Details Modal */}
      {isViewOpen && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="fixed inset-0" onClick={() => setIsViewOpen(false)} />
          
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col z-10 relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-base font-bold text-slate-800">
                View {title} Details
              </h3>
              <button
                onClick={() => setIsViewOpen(false)}
                className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-y-auto p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                {fields.map((field) => {
                  const val = activeItem[field.key];
                  let displayVal = String(val ?? "—");

                  if (field.type === "image" && val) {
                    return (
                      <div key={field.key} className="space-y-1 pb-2 border-b border-slate-50 sm:col-span-2">
                        <dt className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">{field.heading}</dt>
                        <dd className="mt-1">
                          <img
                            src={String(val)}
                            alt={field.heading}
                            className="h-28 w-28 rounded-2xl object-cover border border-slate-200 shadow-sm"
                          />
                        </dd>
                      </div>
                    );
                  }

                  if (field.type === "password") {
                    displayVal = val ? "••••••••" : "—";
                  } else if (field.type === "checkbox") {
                    displayVal = val ? "Enabled / Yes" : "Disabled / No";
                  } else if (field.type === "date" && val) {
                    displayVal = new Date(val).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  } else if (typeof val === "number" && (field.key.toLowerCase().includes("charge") || field.key.toLowerCase().includes("fee") || field.key.toLowerCase().includes("package"))) {
                    displayVal = `₹${val.toLocaleString("en-IN")}`;
                  }

                  return (
                    <div key={field.key} className="space-y-1 pb-2 border-b border-slate-50">
                      <dt className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">{field.heading}</dt>
                      <dd className="font-semibold text-slate-800 text-sm">{displayVal}</dd>
                    </div>
                  );
                })}
              </dl>

              {/* Close Button Footer */}
              <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsViewOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Delete Confirmation Dialog Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-enter">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-rose-100 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <IconTrash className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">Confirm Record Deletion</h3>
            <p className="mt-1.5 text-xs text-slate-500 font-medium">
              Are you sure you want to delete this record? This action will perform permission validation based on your assigned role.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-rose-700 disabled:opacity-50 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Record"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
