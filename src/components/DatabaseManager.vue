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
          <button @click="showTables(database.id)">Show Tables</button>
          <ul v-if="database.tablesVisible">
            <li v-for="table in database.tables" :key="table.id">
              {{ table.name }}
              <button @click="deleteTable(database.id, table.id)">Delete</button>
              <button @click="showRecords(database.id, table.id)">Show Records</button>
              <ul v-if="table.recordsVisible">
                <li v-for="record in table.records" :key="record.id">
                  {{ record.name }}
                  <button @click="deleteRecord(database.id, table.id, record.id)">Delete</button>
                </li>
              </ul>
            </li>
          </ul>
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
      },
      async showTables(databaseId) {
        const database = this.databases.find(db => db.id === databaseId);
        if (database) {
          if (!database.tables) {
            try {
              const response = await axios.get(`/api/databases/${databaseId}/tables`);
              database.tables = response.data;
              database.tablesVisible = true;
            } catch (error) {
              console.error('Error fetching tables:', error);
            }
          } else {
            database.tablesVisible = !database.tablesVisible;
          }
        }
      },
      async deleteTable(databaseId, tableId) {
        try {
          await axios.delete(`/api/databases/${databaseId}/tables/${tableId}`);
          const database = this.databases.find(db => db.id === databaseId);
          if (database) {
            database.tables = database.tables.filter(table => table.id !== tableId);
          }
        } catch (error) {
          console.error('Error deleting table:', error);
        }
      },
      async showRecords(databaseId, tableId) {
        const database = this.databases.find(db => db.id === databaseId);
        if (database) {
          const table = database.tables.find(table => table.id === tableId);
          if (table) {
            if (!table.records) {
              try {
                const response = await axios.get(`/api/databases/${databaseId}/tables/${tableId}/records`);
                table.records = response.data;
                table.recordsVisible = true;
              } catch (error) {
                console.error('Error fetching records:', error);
              }
            } else {
              table.recordsVisible = !table.recordsVisible;
            }
          }
        }
      },
      async deleteRecord(databaseId, tableId, recordId) {
        try {
          await axios.delete(`/api/databases/${databaseId}/tables/${tableId}/records/${recordId}`);
          const database = this.databases.find(db => db.id === databaseId);
          if (database) {
            const table = database.tables.find(table => table.id === tableId);
            if (table) {
              table.records = table.records.filter(record => record.id !== recordId);
            }
          }
        } catch (error) {
          console.error('Error deleting record:', error);
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
  