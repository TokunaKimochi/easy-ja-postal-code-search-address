export const List = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <dl style={{ display: 'flex' }}>
      <dt>{title}:</dt>
      <dd>{children}</dd>
    </dl>
  )
}
