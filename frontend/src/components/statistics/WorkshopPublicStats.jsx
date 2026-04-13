import React, { useEffect, useState, useRef } from 'react';

const WorkshopPublicStats = () => {
  const [formFields, setFormFields] = useState('');
  const [clearUrl, setClearUrl] = useState('/');
  const [tableContent, setTableContent] = useState('');
  const [paginatorTop, setPaginatorTop] = useState('');
  const [paginatorBottom, setPaginatorBottom] = useState('');
  const [activeChart, setActiveChart] = useState(null); // 'state' | 'type' | null
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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
        } catch (e) {
          labels = []; data = [];
        }
        title = 'State wise workshops';
      } else {
        try {
          labels = JSON.parse(document.getElementById('data-ws-type')?.textContent || '[]');
          data = JSON.parse(document.getElementById('data-ws-type-count')?.textContent || '[]');
        } catch(e) {
          labels = []; data = [];
        }
        title = 'Type wise workshops';
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
              backgroundColor: '#0ea5e9', // Tailwind sky-500
              borderColor: '#0284c7', // Tailwind sky-600
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            title: { display: true, text: title, fontSize: 16 }
          }
        });
      }
    }
  }, [activeChart]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen bg-gray-50 text-gray-900 font-sans w-full">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-80 bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
        <form method="GET" className="flex flex-col h-full m-0">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="text-lg font-bold text-gray-800 m-0">Filters</h3>
            <a href={clearUrl} className="flex items-center justify-center h-[32px] px-3 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded cursor-pointer transition-colors hover:bg-gray-100 no-underline">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              Clear
            </a>
          </div>
          
          <div className="p-4 flex flex-col gap-4 flex-1">
            <div 
              className="flex flex-col gap-4 text-sm font-semibold text-gray-700 
                [&>div]:flex [&>div]:flex-col [&>div]:gap-1 
                [&_input]:w-full [&_input]:box-border [&_input]:h-[44px] [&_input]:px-3 [&_input]:text-sm [&_input]:font-normal [&_input]:border [&_input]:border-gray-300 [&_input]:rounded [&_input]:bg-white [&_input]:focus:border-blue-600 [&_input]:focus:ring-1 [&_input]:focus:ring-blue-600 [&_input]:transition-all
                [&_select]:w-full [&_select]:box-border [&_select]:h-[44px] [&_select]:px-3 [&_select]:text-sm [&_select]:font-normal [&_select]:border [&_select]:border-gray-300 [&_select]:rounded [&_select]:bg-white [&_select]:focus:border-blue-600 [&_select]:focus:ring-1 [&_select]:focus:ring-blue-600 [&_select]:transition-all"
              dangerouslySetInnerHTML={{ __html: formFields }}
            />
            
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <button type="submit" className="flex-1 flex items-center justify-center h-[44px] px-4 text-sm font-semibold text-white bg-green-600 border-none rounded cursor-pointer transition-colors hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                View
              </button>
              <button type="submit" name="download" value="download" className="flex-1 flex items-center justify-center h-[44px] px-4 text-sm font-semibold text-white bg-blue-600 border-none rounded cursor-pointer transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download
              </button>
            </div>
          </div>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div 
            className="flex items-center [&_.pagination]:flex [&_.pagination]:gap-1 [&_.pagination]:m-0 [&_.page-item]:list-none [&_.page-link]:px-3 [&_.page-link]:py-1.5 [&_.page-link]:border [&_.page-link]:border-gray-300 [&_.page-link]:rounded [&_.page-link]:text-sm [&_.page-link]:text-gray-700 hover:[&_.page-link]:bg-gray-50 [&_.active_.page-link]:bg-blue-50 [&_.active_.page-link]:border-blue-600 [&_.active_.page-link]:text-blue-600"
            dangerouslySetInnerHTML={{ __html: paginatorTop }} 
          />
          
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveChart(activeChart === 'state' ? null : 'state')}
              className={`flex items-center px-4 h-[44px] text-sm font-semibold border rounded transition-colors focus:outline-none ${activeChart === 'state' ? 'bg-sky-50 border-sky-600 text-sky-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              State Chart
            </button>
            <button 
              onClick={() => setActiveChart(activeChart === 'type' ? null : 'type')}
              className={`flex items-center px-4 h-[44px] text-sm font-semibold border rounded transition-colors focus:outline-none ${activeChart === 'type' ? 'bg-sky-50 border-sky-600 text-sky-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
              Workshops Chart
            </button>
          </div>
        </div>

        {/* Chart Modal View */}
        {activeChart && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[400px]">
            <canvas ref={chartRef}></canvas>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <div 
              className="w-full text-sm text-left text-gray-700
                [&_table]:w-full [&_table]:min-w-[800px] [&_table]:border-collapse [&_table]:m-0
                [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:text-gray-900 [&_th]:tracking-wider [&_th]:border-b [&_th]:border-gray-200
                [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-100 hover:[&_tr]:bg-gray-50/50 [&_tr:last-child_td]:border-b-0"
              dangerouslySetInnerHTML={{ __html: tableContent }}
            />
          </div>
        </div>

        {/* Bottom Paginator */}
        <div 
          className="flex justify-end items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 
            [&_.pagination]:flex [&_.pagination]:gap-1 [&_.pagination]:m-0 [&_.page-item]:list-none [&_.page-link]:px-3 [&_.page-link]:py-1.5 [&_.page-link]:border [&_.page-link]:border-gray-300 [&_.page-link]:rounded [&_.page-link]:text-sm [&_.page-link]:text-gray-700 hover:[&_.page-link]:bg-gray-50 [&_.active_.page-link]:bg-blue-50 [&_.active_.page-link]:border-blue-600 [&_.active_.page-link]:text-blue-600"
          dangerouslySetInnerHTML={{ __html: paginatorBottom }} 
        />
      </main>
    </div>
  );
};

export default WorkshopPublicStats;
