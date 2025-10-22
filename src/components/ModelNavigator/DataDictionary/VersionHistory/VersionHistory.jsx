import React, { useState, useEffect } from 'react';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const VersionHistory = ({ classes, markdownUrl }) => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (!markdownUrl) {
        setError('No version history URL provided.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(markdownUrl);
        setMarkdown(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching markdown:', err);
        setError('Failed to load version history. Please try again later.');
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [markdownUrl]);

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
        <Typography variant="body1" className={classes.loadingText}>
          Loading version history...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.errorContainer}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.markdownContainer}>
        <ReactMarkdown className={classes.markdown}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

const styles = () => ({
  container: {
    // padding: '20px',
    fontFamily: 'Lato, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    height: '100%',
    overflow: 'auto',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 20px',
    height: '100%',
  },
  loadingText: {
    marginTop: '20px',
    color: '#3E7AAB',
  },
  errorContainer: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  markdownContainer: {
    // backgroundColor: '#fff',
    // borderRadius: '5px',
    // boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    // padding: '30px',
  },
  markdown: {
    '& h1': {
      color: '#3E7AAB',
      borderBottom: '1px solid #ddd',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    '& h2': {
      color: '#3E7AAB',
      marginTop: '30px',
      marginBottom: '15px',
    },
    '& h3': {
      color: '#3E7AAB',
      marginBottom: '10px',
    },
    '& p': {
      marginBottom: '15px',
      lineHeight: '1.6',
    },
    '& ul': {
      paddingLeft: '20px',
      marginBottom: '15px',
    },
    '& li': {
      marginBottom: '5px',
      lineHeight: '1.6',
    },
    '& a': {
      color: '#1565C0',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& code': {
      backgroundColor: '#f5f5f5',
      padding: '2px 5px',
      borderRadius: '3px',
      fontFamily: 'monospace',
    },
    '& pre': {
      backgroundColor: '#f5f5f5',
      padding: '15px',
      borderRadius: '5px',
      overflow: 'auto',
      marginBottom: '20px',
    },
    '& blockquote': {
      borderLeft: '4px solid #ddd',
      paddingLeft: '15px',
      color: '#666',
      fontStyle: 'italic',
      margin: '0 0 20px',
    },
    '& table': {
      borderCollapse: 'collapse',
      width: '100%',
      marginBottom: '20px',
    },
    '& th, & td': {
      border: '1px solid #ddd',
      padding: '8px 12px',
      textAlign: 'left',
    },
    '& th': {
      backgroundColor: '#f2f2f2',
    },
    '& tr:nth-child(even)': {
      backgroundColor: '#f9f9f9',
    },
  },
});

export default withStyles(styles)(VersionHistory);
