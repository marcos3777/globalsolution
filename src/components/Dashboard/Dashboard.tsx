import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [grafico, setGrafico] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);