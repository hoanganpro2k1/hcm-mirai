import { Graph, Thing } from "schema-dts";

type JsonLdProps = {
  data: Graph | Thing;
};

/**
 * Component dùng để chèn dữ liệu cấu trúc (JSON-LD) vào trang web.
 * Hỗ trợ SEO tốt hơn bằng cách chèn script vào trực tiếp HTML.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
