<template>
    <div>
      <h2>Table Manager</h2>
      <div class="columns">
        <input v-model="newColumnName" placeholder="Enter column name">
        <select v-model="newColumnType">
          <option value="TEXT">TEXT</option>
          <option value="INTEGER">INTEGER</option>
          <option value="REAL">REAL</option>
        </select>
        <button @click="addColumn">Add Column</button>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">{{ row[column.name] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        columns: [],
        rows: [],
        newColumnName: '',
        newColumnType: 'TEXT'
      };
    },
    methods: {
      async addColumn() {
        try {
          await axios.post('/api/columns', { name: this.newColumnName, type: this.newColumnType });
          this.newColumnName = '';
          this.fetchColumns();
        } catch (error) {
          console.error('Error adding column:', error);
        }
      },
      async fetchColumns() {
        try {
          const response = await axios.get('/api/columns');
          this.columns = response.data;
          this.fetchRows();
        } catch (error) {
          console.error('Error fetching columns:', error);
        }
      },
      async fetchRows() {
        try {
          const response = await axios.get('/api/rows');
          this.rows = response.data;
        } catch (error) {
          console.error('Error fetching rows:', error);
        }
      }
    },
    created() {
      this.fetchColumns();
    }
  };
  </script>
  
  <style scoped>
  .columns {
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid black;
    padding: 5px;
  }
  </style>
  