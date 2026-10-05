'use client';

import { useState, type FormEvent } from 'react';
import { Header, Footer } from '../components/SiteChrome';

type ContactState = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
};

const initialState: ContactState = {
  name: '',
  email: '',
  phone: '',
  serviceType: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof ContactState>(key: K, value: ContactState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header active="Contact" />
      <main>
        <section className="page���q�^