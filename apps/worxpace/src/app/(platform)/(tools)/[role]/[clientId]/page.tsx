interface Params {
  params: { role: string; clientId: string };
}

const Client = ({ params: { role, clientId } }: Params) => {
  return (
    <div>
      Client {role} - {clientId}
    </div>
  );
};

export default Client;
