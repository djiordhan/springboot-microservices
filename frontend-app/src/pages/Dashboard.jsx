import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userService, orderService, notificationService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalNotifications: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      const [users, orders, notifications] = await Promise.all([
        userService.getAllUsers().catch(() => []),
        orderService.getAllOrders().catch(() => []),
        notificationService.getAllNotifications().catch(() => []),
      ]);

      setStats({
        totalUsers: Array.isArray(users) ? users.length : 0,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalNotifications: Array.isArray(notifications) ? notifications.length : 0,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load dashboard statistics',
      }));
    }
  };

  if (stats.loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the Microservices Management Hub</p>
      </div>

      {stats.error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{stats.error}</span>
        </div>
      )}

      <div className="stats-grid">
        <Link to="/users" className="stat-card stat-card-users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-trend">
            <span className="trend-icon">📈</span>
            <span className="trend-text">View All</span>
          </div>
        </Link>

        <Link to="/orders" className="stat-card stat-card-orders">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-trend">
            <span className="trend-icon">📈</span>
            <span className="trend-text">View All</span>
          </div>
        </Link>

        <Link to="/notifications" className="stat-card stat-card-notifications">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalNotifications}</div>
            <div className="stat-label">Notifications</div>
          </div>
          <div className="stat-trend">
            <span className="trend-icon">📈</span>
            <span className="trend-text">View All</span>
          </div>
        </Link>
      </div>

      <div className="info-section">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏗️ Architecture Overview</h3>
          </div>
          <div className="architecture-info">
            <div className="service-item">
              <div className="service-badge badge-primary">API Gateway</div>
              <p>Port 8080 - Main entry point for all requests</p>
            </div>
            <div className="service-item">
              <div className="service-badge badge-success">User Service</div>
              <p>Port 8081 - User management with MySQL & Redis</p>
            </div>
            <div className="service-item">
              <div className="service-badge badge-warning">Order Service</div>
              <p>Port 8082 - Order processing with PostgreSQL & Kafka</p>
            </div>
            <div className="service-item">
              <div className="service-badge badge-info">Notification Service</div>
              <p>Port 8083 - Event-driven notifications with Apache Camel</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🚀 Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <Link to="/users" className="btn btn-primary">
              <span>➕</span>
              Create User
            </Link>
            <Link to="/orders" className="btn btn-primary">
              <span>🛒</span>
              Create Order
            </Link>
            <button onClick={fetchStats} className="btn btn-secondary">
              <span>🔄</span>
              Refresh Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
