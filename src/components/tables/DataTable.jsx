import { useState } from 'react';
import { ChevronUp, ChevronDown, Search, Filter } from 'lucide-react';

const DataTable = ({ 
  columns, 
  data, 
  onRowClick,
  searchable = true,
  filterable = false,
  itemsPerPage = 10 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  let processedData = [...data];

  // Search
  if (searchTerm) {
    processedData = processedData.filter(item =>
      columns.some(col => {
        const value = col.accessor(item);
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }

  // Sort
  if (sortConfig.key) {
    processedData.sort((a, b) => {
      const aValue = columns.find(col => col.key === sortConfig.key).accessor(a);
      const bValue = columns.find(col => col.key === sortConfig.key).accessor(b);

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {searchable && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {filterable && (
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={column.sortable ? 'cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-dark-700' : ''}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 -mb-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-primary-600'
                              : 'text-slate-400'
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-primary-600'
                              : 'text-slate-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-800 divide-y divide-slate-200 dark:divide-dark-700">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(row) : column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-12">
                  <p className="text-slate-500 dark:text-slate-400">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, processedData.length)} of {processedData.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="btn-secondary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="btn-secondary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;