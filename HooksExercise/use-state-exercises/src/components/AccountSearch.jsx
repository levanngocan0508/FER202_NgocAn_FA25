import React, { useMemo, useState } from 'react';

// Danh sách accounts (demo)
const accounts = [
  { id: 1, username: 'alice',   avatar: 'https://i.pravatar.cc/80?img=1' },
  { id: 2, username: 'bob',     avatar: 'https://i.pravatar.cc/80?img=2' },
  { id: 3, username: 'charlie', avatar: 'https://i.pravatar.cc/80?img=3' },
  { id: 4, username: 'david',   avatar: 'https://i.pravatar.cc/80?img=4' },
  { id: 5, username: 'emily',   avatar: 'https://i.pravatar.cc/80?img=5' },
];

export default function AccountSearch() {
  const [q, setQ] = useState('');

  // Lọc theo chữ cái đầu (giống SearchItem — startsWith)
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return accounts;
    return accounts.filter(a => a.username.toLowerCase().startsWith(s));
  }, [q]);

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '40px auto',
        padding: 24,
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,.08)',
        background: '#f7fafd',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 18 }}>
        Tìm theo username
      </h3>

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nhập username (ký tự đầu)…"
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 8,
          border: '1.5px solid #90caf9',
          marginBottom: 14,
          fontSize: 16,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
        {list.map(a => (
          <li
            key={a.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#e3f2fd',
              marginBottom: 10,
              padding: '10px 12px',
              borderRadius: 10,
              fontSize: 16,
              color: '#333',
              boxShadow: '0 1px 4px rgba(33,150,243,.07)',
              cursor: 'pointer',
            }}
          >
            <img
              src={a.avatar}
              alt={a.username}
              width={40}
              height={40}
              style={{ borderRadius: '50%', objectFit: 'cover', flex: '0 0 40px' }}
            />
            <span style={{ fontWeight: 600 }}>{a.username}</span>
          </li>
        ))}

        {list.length === 0 && (
          <li style={{ color: '#888', textAlign: 'center', padding: '10px 0' }}>
            Không tìm thấy kết quả
          </li>
        )}
      </ul>
    </div>
  );
}
