module.exports = {
  ci: {
    collect: { url: ['http://localhost:5173'], numberOfRuns: 3 },
    assert: { assertions: {
      'categories:accessibility': ['warn', { minScore: 0.9 }],
      'categories:best-practices': ['warn', { minScore: 0.9 }]
    }},
    upload: { target: 'temporary-public-storage' }
  }
};
