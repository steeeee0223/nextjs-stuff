interface Params {
  params: { documentId: string };
}

const DocumentPage = ({ params: { documentId } }: Params) => {
  return <div className="pb-40">Document - {documentId}</div>;
};

export default DocumentPage;
