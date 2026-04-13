import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const WorkshopPublicStats = () => {
  const [formFields, setFormFields] = useState('');
  const [clearUrl, setClearUrl] = useState('/');
  const [tableContent, setTableContent] = useState('');
  const [paginatorTop, setPaginatorTop] = useState('');
  const [paginatorBottom, setPaginatorBottom] = useState('');
  const [activeChart, setActiveChart] = useState('state');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  /**
   * Data Extraction: Retrieves server-rendered form fields and table data.
   */
  useEffect(() => {
    const fieldsEl = document.getElementById('django-form-fields');
    const tableEl = document.getElementById('django-table-content');
    const pagTopEl = document.getElementById('django-paginator-top');
    const pagBotEl = document.getElementById('django-paginator-bottom');
    const clearUrlEl = document.getElementById('django-form-clear-url');

    setFormFields(fieldsEl ? fieldsEl.innerHTML : '');
    setTableContent(tableEl ? tableEl.innerHTML : '');
    setPaginatorTop(pagTopEl ? pagTopEl.innerHTML : '');
    setPaginatorBottom(pagBotEl ? pagBotEl.innerHTML : '');
    setClearUrl(clearUrlEl ? clearUrlEl.getAttribute('data-url') || '/' : '/');
  }, []);

  /**
   * Chart Logic: Initializes and cleans up Chart.js instances.
   */
  useEffect(() => {
    if (activeChart && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      let labels = [];
      let data = [];
      let title = '';

      if (activeChart === 'state') {
        try {
          labels = JSON.parse(document.getElementById('data-ws-states')?.textContent || '[]');
          data = JSON.parse(document.getElementById('data-ws-count')?.textContent || '[]');
        } catch (e) { labels = []; data = []; }
        title = 'Workshops by State';
      } else {
        try {
          labels = JSON.parse(document.getElementById('data-ws-type')?.textContent || '[]');
          data = JSON.parse(document.getElementById('data-ws-type-count')?.textContent || '[]');
        } catch(e) { labels = []; data = []; }
        title = 'Workshops by Category';
      }

      const Chart = window.Chart;
      if (Chart) {
        chartInstanceRef.current = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: title,
              data: data,
              backgroundColor: '#1e293b',
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{ ticks: { beginAtZero: true } }]
            }
          }
        });
      }
    }
  }, [activeChart, tableContent]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-[calc(100vh-56px)] bg-gray-50 text-gray-900 font-sans w-full">
      {/* Sidebar Filters - Simple Layout */}
      <aside className="w-full md:w-80 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
        <form method="GET" className="flex flex-col m-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="text-sm font-bold text-gray-800 m-0 uppercase tracking-tight">Filters</h3>
            <a href={clearUrl} className="text-xs font-semibold text-blue-600 no-underline hover:underline">Clear All</a>
          </div>
          
          <div className="p-5 flex flex-col gap-4">
            <div 
              className="flex flex-col gap-4 text-xs font-bold text-gray-500 uppercase
                [&>div]:flex [&>div]:flex-col [&>div]:gap-1.5
                [&_input]:w-full [&_input]:h-[40px] [&_input]:px-3 [&_input]:text-sm [&_input]:font-normal [&_input]:border [&_input]:border-gray-200 [&_input]:rounded [&_input]:bg-white [&_input]:focus:border-slate-800 [&_input]:focus:ring-1 [&_input]:focus:ring-slate-800 [&_input]:transition-all
                [&_select]:w-full [&_select]:h-[40px] [&_select]:px-3 [&_select]:text-sm [&_select]:font-normal [&_select]:border [&_select]:border-gray-200 [&_select]:rounded [&_select]:bg-white [&_select]:focus:border-slate-800 [&_select]:focus:ring-1 [&_select]:focus:ring-slate-800 [&_select]:transition-all"
              dangerouslySetInnerHTML={{ __html: formFields }}
            />
            
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
              <button type="submit" className="w-full h-[42px] bg-slate-800 text-white font-bold rounded cursor-pointer hover:bg-slate-900 transition-colors">
                Apply Filters
              </button>
              <button type="submit" name="download" value="download" className="w-full h-[42px] bg-white border border-gray-200 text-gray-700 font-bold rounded cursor-pointer hover:bg-gray-50 transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </form>
      </aside>

      {/* Main Results Area */}
      <main className="flex-1 flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col gap-6"
        >
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 m-0">Workshop Analysis</h2>
              <div className="flex bg-gray-100 p-1 rounded-md">
                <button 
                  onClick={() => setActiveChart('state')}
                  className={`px-3 py-1.5 text-xs font-bold rounded ${activeChart === 'state' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  By State
                </button>
                <button 
                  onClick={() => setActiveChart('type')}
                  className={`px-3 py-1.5 text-xs font-bold rounded ${activeChart === 'type' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  By Type
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div 
                className="flex items-center [&_.pagination]:flex [&_.pagination]:gap-1 [&_.pagination]:m-0 [&_.page-item]:list-none [&_.page-link]:px-2.5 [&_.page-link]:py-1 [&_.page-link]:border [&_.page-link]:border-gray-200 [&_.page-link]:rounded [&_.page-link]:text-xs [&_.page-link]:text-gray-600 hover:[&_.page-link]:bg-white [&_.active_.page-link]:bg-slate-800 [&_.active_.page-link]:border-slate-800 [&_.active_.page-link]:text-white"
                dangerouslySetInnerHTML={{ __html: paginatorTop }} 
              />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Records Database</span>
            </div>
            
            <div className="overflow-x-auto w-full">
              <div 
                className="w-full text-sm text-left
                  [&_table]:w-full [&_table]:min-w-[800px] [&_table]:border-collapse
                  [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_th]:text-[10px] [&_th]:font-bold [&_th]:text-gray-500 [&_th]:uppercase [&_th]:tracking-wider [&_th]:border-b [&_th]:border-gray-100
                  [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-50 [&_td]:text-gray-700 [&_tr:hover]:bg-gray-50/50"
                dangerouslySetInnerHTML={{ __html: tableContent }}
              />
            </div>

            <div className="p-4 flex justify-center border-t border-gray-100 bg-gray-50">
              <div 
                className="flex items-center [&_.pagination]:flex [&_.pagination]:gap-1 [&_.pagination]:m-0 [&_.page-item]:list-none [&_.page-link]:px-3 [&_.page-link]:py-1.5 [&_.page-link]:border [&_.page-link]:border-gray-200 [&_.page-link]:rounded [&_.page-link]:text-xs [&_.page-link]:text-gray-600 hover:[&_.page-link]:bg-white [&_.active_.page-link]:bg-slate-800 [&_.active_.page-link]:border-slate-800 [&_.active_.page-link]:text-white"
                dangerouslySetInnerHTML={{ __html: paginatorBottom }} 
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default WorkshopPublicStats;
