$(document).ready(function() {
   var stock_data = [
       {
           "name": "ACME Gadgets",
           "symbol": "AGDTS",
           "last": [2.57, 2.54, 2.54, 2.56, 2.57, 2.58, 2.59]
       },
       {
           "name": "Spry Media Productions",
           "symbol": "SPMP",
           "last": [1.12, 1.11, 1.08, 1.08, 1.09, 1.11, 1.08]
       },
       {
           "name": "Widget Emporium",
           "symbol": "WDEMP",
           "last": [3.40, 3.39, 3.46, 3.51, 3.50, 3.48, 3.49]
       },
       {
           "name": "Sole Goodman",
           "symbol": "SGMAN",
           "last": [16.20, 16.40, 16.36, 16.35, 16.61, 16.46, 16.19]
       },
       {
           "name": "Stanler Bits and Bobs",
           "symbol": "SBIBO",
           "last": [82.51, 83.47, 83.40, 83.68, 83.81, 83.29, 83.72]
       }
   ];

   let table = $('#example').DataTable({
       ajax: function(dataSent, callback, settings) {
           let data = this.api().ajax.json();
           if(data == undefined) {
               data = stock_data;
           } else {
               data = data.data;
               for(i = 0; i < data.length; i++) {
                   data[i].last.push(data[i].last.shift())
               }
           }

           callback({data: data});
       },
       paging: false,
       initComplete: function() {
           let api = this.api();
           setInterval(function() {
               api.ajax.reload();
           }, 5000);
       },
       drawCallback: function() {
           $('.sparkline')
               .map(function() {
                   return $('canvas', this).length ? null : this;
               })
               .sparkline('html', {
                   type: 'line',
                   width: '250px'
               })
       },
       columns: [
           {
               data: 'name'
           },
           {
               data: 'symbol'
           },
           {
               data: null,
               render: function(data, type, row, meta) {
                   return row.last[row.last.length - 1].toFixed(2);
               }
           },
           {
               data: null,
               render: function(data, type, row, meta) {
                   var val = (row.last[row.last.length - 1] - row.last[row.last.length - 2]).toFixed(2);
                   var colour = val < 0 ? 'red' : 'green'
                   return type === 'display' ?
                       '<span style="color:' + colour + '">' + val + '</span>' :
                       val;
               }
           },
           {
               data: 'last',
               render: function(data, type, row, meta) {
                   return type === 'display' ?
                       '<span class="sparkline">' + data.toString() + '</span>' :
                       data;
               }
           }
       ]
   });
});