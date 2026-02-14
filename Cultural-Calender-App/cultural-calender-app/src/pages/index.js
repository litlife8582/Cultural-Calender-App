import { useState, useEffect } from 'react';

export default function Home() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    year: 2025,
    religion: '',
    state: ''
  });

  useEffect(() => {
    fetchFestivals();
  }, [filters]);

  const fetchFestivals = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        year: filters.year,
        ...(filters.religion && { religion: filters.religion }),
        ...(filters.state && { state: filters.state })
      });

      const response = await fetch(`/api/v1/festivals?${queryParams}`, {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || 'your-secret-api-key-change-this'
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        setFestivals(data.data.festivals);
      } else {
        setError(data.error.message);
      }
    } catch (err) {
      setError('Failed to fetch festivals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>🎉 Indian Festival Calendar API</h1>
      <p>A comprehensive API for Indian festivals and rituals</p>

      {/* Filters */}
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px' 
      }}>
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div>
            <label>Year: </label>
            <input
              type="number"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              style={{ padding: '5px' }}
            />
          </div>

          <div>
            <label>Religion: </label>
            <select
              value={filters.religion}
              onChange={(e) => setFilters({ ...filters, religion: e.target.value })}
              style={{ padding: '5px' }}
            >
              <option value="">All</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Sikh">Sikh</option>
              <option value="Christian">Christian</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Jain">Jain</option>
            </select>
          </div>

          <div>
            <label>State: </label>
            <input
              type="text"
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              placeholder="e.g., Maharashtra"
              style={{ padding: '5px' }}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p>Loading festivals...</p>}

      {/* Error State */}
      {error && (
        <div style={{ 
          background: '#ffebee', 
          color: '#c62828', 
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      {/* Festivals List */}
      {!loading && !error && (
        <div>
          <h2>Found {festivals.length} Festivals</h2>
          <div style={{ 
            display: 'grid', 
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
          }}>
            {festivals.map((festival) => (
              <div
                key={festival.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '20px',
                  background: '#fff'
                }}
              >
                <h3 style={{ marginTop: 0, color: '#1976d2' }}>
                  {festival.name}
                </h3>
                
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  📅 {new Date(festival.date.gregorian).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                <p style={{ fontSize: '14px' }}>{festival.description}</p>

                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  flexWrap: 'wrap',
                  marginTop: '10px'
                }}>
                  <span style={{
                    background: '#e3f2fd',
                    color: '#1976d2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {festival.religion}
                  </span>

                  <span style={{
                    background: '#f3e5f5',
                    color: '#7b1fa2',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {festival.type}
                  </span>

                  {festival.public_holiday && (
                    <span style={{
                      background: '#e8f5e9',
                      color: '#2e7d32',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      Public Holiday
                    </span>
                  )}
                </div>

                <div style={{ marginTop: '15px', fontSize: '13px' }}>
                  <strong>Duration:</strong> {festival.duration_days} day(s)
                </div>

                {festival.states && (
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                    <strong>Celebrated in:</strong> {festival.states.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Documentation Link */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#e3f2fd',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>📚 API Documentation</h3>
        <p>Learn how to use the Festival Calendar API</p>
        <div style={{ marginTop: '10px' }}>
          <code style={{
            background: '#fff',
            padding: '10px 15px',
            borderRadius: '5px',
            display: 'inline-block'
          }}>
            GET /api/v1/festivals?year=2025
          </code>
        </div>
        <p style={{ marginTop: '15px', fontSize: '14px' }}>
          Don't forget to include <code>X-API-Key</code> header in your requests!
        </p>
      </div>
    </div>
  );
}
