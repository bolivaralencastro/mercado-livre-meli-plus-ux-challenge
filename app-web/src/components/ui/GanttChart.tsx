'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    google: any;
  }
}

const GanttChart = () => {
  const [loaded, setLoaded] = useState(false);

  const drawChart = React.useCallback(() => {
    const container = document.getElementById('gantt_chart');
    if (!container) return;

    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Início');
    data.addColumn('date', 'Término');
    data.addColumn('number', 'Duração');
    data.addColumn('number', '% Concluído');
    data.addColumn('string', 'Dependências');

    const year = 2025;
    const month = 10; // Novembro (0-indexed)

    const tasks = [
      ['fase-1', 'Briefing e Alinhamento', 'default', new Date(year, month, 20, 8), new Date(year, month, 20, 12), null, 100, null],
      ['fase-2', 'Pesquisa e Descoberta', 'default', new Date(year, month, 20, 13), new Date(year, month, 21, 22), null, 100, 'fase-1'],
      ['fase-3', 'Estratégia', 'default', new Date(year, month, 23, 8), new Date(year, month, 23, 18), null, 100, 'fase-2'],
      ['fase-4', 'Ideação e Wireframes', 'default', new Date(year, month, 23, 14), new Date(year, month, 24, 12), null, 100, 'fase-3'],
      ['fase-5', 'UI Design de Alta Fidelidade', 'default', new Date(year, month, 24, 14), new Date(year, month, 24, 22), null, 100, 'fase-4'],
      ['fase-6', 'Prototipagem', 'default', new Date(year, month, 25, 18), new Date(year, month, 25, 20), null, 100, 'fase-5'],
      ['fase-7', 'Apresentação', 'default', new Date(year, month, 25, 20), new Date(year, month, 26, 20), null, 100, 'fase-6'],
      ['fase-8', 'Entrega Final', 'delivery', new Date(year, month, 26, 20), new Date(year, month, 26, 22), null, 100, 'fase-7']
    ];

    data.addRows(tasks);

    const ganttHeaderHeight = 45;
    const ganttTrackHeight = 45;
    const chartHeight = ganttHeaderHeight + (tasks.length * ganttTrackHeight);

    const options = {
      height: chartHeight,
      tooltip: { isHtml: true }, // Habilita tooltip HTML customizável via CSS
      gantt: {
        trackHeight: ganttTrackHeight,
        barHeight: 28,
        criticalPathEnabled: false,
        arrow: {
          angle: 100,
          width: 1,
          color: '#AAB3BF',
          radius: 0
        },
        labelStyle: {
          fontName: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 14,
          color: '#333333'
        },
        palette: [
          { "color": "#3483fa", "dark": "#2968c8", "light": "#d2e3fc" }, // default (Azul Meli)
          { "color": "#00a650", "dark": "#008a43", "light": "#e5f6ed" }  // delivery (Verde Sucesso)
        ]
      },
      backgroundColor: 'transparent'
    };

    const chart = new window.google.visualization.Gantt(container);
    chart.draw(data, options);
    setLoaded(true);
  }, []);

  const loadChart = React.useCallback(() => {
    if (!window.google) return;
    
    window.google.charts.load('current', { packages: ['gantt'] });
    window.google.charts.setOnLoadCallback(drawChart);
  }, [drawChart]);

  useEffect(() => {
    if (window.google && window.google.charts) {
      // Se já estiver carregado (navegação client-side)
      loadChart();
    }
  }, [loadChart]);

  return (
    <>
      <Script 
        src="https://www.gstatic.com/charts/loader.js" 
        onLoad={loadChart}
      />
      <style jsx global>{`
        .google-visualization-tooltip {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
          border-radius: 6px !important;
          box-shadow: 0 4px 16px 0 rgba(0,0,0,0.2) !important;
          border: 1px solid #ededed !important;
          background: #ffffff !important;
          padding: 16px !important;
          z-index: 1000 !important;
        }
        .google-visualization-tooltip-item {
          font-size: 14px !important;
          line-height: 1.4 !important;
          margin-bottom: 4px !important;
        }
        .google-visualization-tooltip-item-list {
           margin: 0 !important;
           padding: 0 !important;
        }
        /* Título da tarefa na tooltip */
        .google-visualization-tooltip-item:first-child {
          font-weight: 600 !important;
          color: #333333 !important;
          font-size: 16px !important;
          margin-bottom: 8px !important;
          display: block !important;
        }
        /* Datas e duração */
        .google-visualization-tooltip-item:not(:first-child) {
          color: #666666 !important;
        }
      `}</style>
      <div className="w-full overflow-x-auto pb-4">
        <div id="gantt_chart" className="min-w-[800px]" />
      </div>
    </>
  );
};

export default GanttChart;
