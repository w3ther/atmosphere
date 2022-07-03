import { ClientOnly } from "remix-utils";
import CreateMap from "../../mapUtils/map.client";

const Fallback = () => {
  return <div>Loading IDE...</div>;
};
export default function AdminPage() {
  return (
    <ClientOnly fallback={<Fallback />}>
      {() => (
        <div>
          <CreateMap></CreateMap>
        </div>
      )}
    </ClientOnly>
  );
}
