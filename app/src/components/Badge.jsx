export default function Badge({
  label,
  bg,
  color,
  border,
  icon: Icon,
  borderRadius = '100px',
  fontSize = '11px',
  fontWeight = '600',
  padding = '2px 8px',
  uppercase = false,
}) {
  return (
    <span style={{
      display: Icon ? 'inline-flex' : 'inline-block',
      alignItems: Icon ? 'center' : undefined,
      gap: Icon ? '4px' : undefined,
      padding,
      borderRadius,
      fontSize,
      fontWeight,
      background: bg,
      color,
      border: border ? `1px solid ${border}` : undefined,
      textTransform: uppercase ? 'uppercase' : undefined,
      letterSpacing: uppercase ? '0.04em' : undefined,
      whiteSpace: 'nowrap',
    }}>
      {Icon && <Icon size={10} />}
      {label}
    </span>
  );
}
