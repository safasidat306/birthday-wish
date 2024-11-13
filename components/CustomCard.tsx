// components/CustomCard.tsx

import React from 'react'

const CustomCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return <div className={`your-default-styles ${className}`}>{children}</div>
}

export default CustomCard
