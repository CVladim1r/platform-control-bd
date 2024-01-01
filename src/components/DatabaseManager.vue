<template>
    <div>
      <h1>Database Manager</h1>
      <div>
        <input v-model="newDatabase" placeholder="Enter database name" />
        <button @click="createDatabase">Create Database</button>
      </div>
      <ul>
        <li v-for="database in databases" :key="database.id">
          {{ database.name }}
          <button @click="deleteDatabase(database.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        databases: [],
        newDatabase: ''
      };
    },
    methods: {
      async fetchDatabases() {
        try {
          const response = await axios.get('/api/databases');
          this.databases = response.data;
        } catch (error) {
          console.error('Error fetching databases:', error);
        }
      },
      async createDatabase() {
        try {
          await axios.post('/api/databases', { name: this.newDatabase });
          this.newDatabase = '';
          this.fetchDatabases();
        } catch (error) {
          console.error('Error creating database:', error);
        }
      },
      async deleteDatabase(id) {
        try {
          await axios.delete(`/api/databases/${id}`);
          this.fetchDatabases();
        } catch (error) {
          console.error('Error deleting database:', error);
        }
      }
    },
    created() {
      this.fetchDatabases();
    }
  };
  </script>
  
  <style scoped>
  </style>
  