import { CollaboratorTable } from "@/components/CollaboratorTable";
import React from "react";
import "./collaborator.css";
type pageProps = {};

const CollaboratorPage: React.FC<pageProps> = () => {
  return (
    <div className="container">
      <CollaboratorTable />
    </div>
  );
};
export default CollaboratorPage;
