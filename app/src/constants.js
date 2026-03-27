import { AlertCircle, AlertTriangle, Clock } from 'lucide-react';

export const STATUS_CONFIG = {
  Critical: {
    bg: '#fee2e2',
    color: '#dc2626',
    border: '#fecaca',
    icon: AlertCircle,
  },
  'At Risk': {
    bg: '#fef3c7',
    color: '#d97706',
    border: '#fde68a',
    icon: AlertTriangle,
  },
  'Expiring Soon': {
    bg: '#f0fdf4',
    color: '#16a34a',
    border: '#bbf7d0',
    icon: Clock,
  },
};

// primary = solid bg color (shopper view); bg/border = light style (manager view)
export const LABEL_CONFIG = {
  'Tonight Only':       { primary: '#c2410c', bg: '#fff7ed', border: '#fed7aa' },
  "Today's Lunch Deal": { primary: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
  'High Demand':        { primary: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  'Expiring Today':     { primary: '#d97706', bg: '#fffbeb', border: '#fde68a' },
};

export const CATEGORY_COLORS = {
  Protein: { bg: '#ede9fe', color: '#7c3aed' },
  Produce: { bg: '#dcfce7', color: '#15803d' },
  Dairy:   { bg: '#dbeafe', color: '#1d4ed8' },
  Bakery:  { bg: '#fef3c7', color: '#92400e' },
};
