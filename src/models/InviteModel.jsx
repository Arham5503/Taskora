import { useState } from "react";
import { generateInviteLink } from "../api/ApiBuilder";
import { toast } from "react-toastify";
import { Check, Copy, X } from "lucide-react";

function InviteModel({ projectId, onClose }) {
  const [inviteLink, setInviteLink] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");
  const [linkCopied, setLinkCopied] = useState(false);
  const handleGenerateInvite = async (roleToUse = inviteRole) => {
    try {
      const response = await generateInviteLink(projectId, roleToUse);
      setInviteLink(response.inviteUrl);
    } catch {
      toast.error("Failed to generate invite link");
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast.success("Copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const primaryBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.45rem 0.875rem",
    background:
      "linear-gradient(135deg, var(--app-primary), var(--app-accent))",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.8125rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };
  return (
    <ModalShell
      onClose={() => {
        onClose();
        setInviteLink("");
        setInviteRole("viewer");
      }}
      title="Invite Team Member"
    >
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--app-heading)",
            display: "block",
            marginBottom: "0.375rem",
          }}
        >
          Invite as
        </label>
        <select
          value={inviteRole}
          onChange={(e) => {
            const nextRole = e.target.value;
            setInviteRole(nextRole);
            handleGenerateInvite(nextRole);
          }}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--app-border)",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--app-heading)",
            backgroundColor: "var(--app-card)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="viewer">Viewer</option>
          <option value="contributor">Contributor</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      {/* Generate button — needed to actually trigger the link */}
      {!inviteLink && (
        <button
          onClick={() => handleGenerateInvite()}
          style={{
            ...primaryBtnStyle,
            marginBottom: "1rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          Generate Invite Link
        </button>
      )}

      {inviteLink && (
        <>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--app-text)",
              marginBottom: "1rem",
            }}
          >
            Share this link to invite a team member.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={inviteLink}
              readOnly
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--app-border)",
                borderRadius: "0.5rem",
                backgroundColor: "var(--app-card-muted)",
                fontSize: "0.875rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button onClick={copyInviteLink} style={primaryBtnStyle}>
              {linkCopied ? <Check size={14} /> : <Copy size={14} />}
              {linkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--app-text)",
              marginTop: "0.625rem",
            }}
          >
            Expires in 7 days.
          </p>
        </>
      )}
    </ModalShell>
  );
}
function ModalShell({ children, onClose, title }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--app-card)",
          borderRadius: "0.75rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "28rem",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--app-text)",
            }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export default InviteModel;
