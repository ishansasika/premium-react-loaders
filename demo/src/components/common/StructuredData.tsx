import { Helmet } from 'react-helmet-async';
import type { StructuredData as StructuredDataType } from '../../utils/structuredData';

interface StructuredDataProps {
  data: StructuredDataType | StructuredDataType[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
