<template>
          <div class="q-pa-md">
              <q-table
                  class="my-sticky-colum-table"
                  flat bordered
                  :rows="information"
                  :columns="columns"
                  row-key="label"
                  v-model:pagination="pagination"
                  hide-header
                  hide-bottom
              />
          </div>
  </template>
      
  <script>
  export default {
    data() {
      return {
        information: [
          { label: 'ID', value: '5' },
          { label: 'User ID', value: '7'},
          { label: 'Name', value: 'John'},
          { label: 'Created at', value: '2013-05-01'},
          { label: 'Address', value: 'Street No.1'}
        ],
        columns: [
          { name: 'label', 
            required: true, 
            label: 'Keyword', 
            align: 'center', 
            field: 'label', 
            sortable: false,
            style: 'width: 500px'
          },
          { name: 'value', 
            label: 'value', 
            align: 'left', 
            field: 'value', 
            sortable: false 
          },
        ],
        pagination: {
          rowsPerPage: 10
        }
      };
    },
  }
  </script>
  
  <style lang="scss">
  .my-sticky-colum-table {
    max-width: 90%;
    max-width: 85%;
    margin-top: 30px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    width: 1234px;
    //th already hide
    thead tr:first-child th:first-child {
      background-color: #D9D9D9;
    }
    thead tr:first-child th:nth-child(2) {
      background-color: #EBEBEB;
    } 
    td:first-child {
      background-color: #D9D9D9;
    }
    td:nth-child(2) {
      background-color: #EBEBEB;
    }
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
    }
    th:nth-child(2),
    td:nth-child(2) {
      position: sticky;
      left: 500px;
      z-index: 1;
    }
  }
  
  .q-table td {
    font-size: 25px !important;
  }
  </style>
  