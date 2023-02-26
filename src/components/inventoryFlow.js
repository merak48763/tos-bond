import { useState, useEffect } from "react";
import {
  Fab,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Box,
  CircularProgress
} from "@mui/material";
import {
  Inventory2Outlined as InventoryIcon,
  Done as DoneIcon,
  ErrorOutlineOutlined as FailIcon
} from "@mui/icons-material";
import { useCheckup } from "../util/checkup";
import styled from "@emotion/styled";

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;
const SwitchButton = styled(ToggleButton)`
  padding: 4px 6px;
  width: 5em;
`;

const NumberField = ({value, onChange, label}) => {
  return (
    <TextField
      variant="standard"
      margin="dense"
      label={label}
      value={value}
      onChange={onChange}
    />
  );
}

const InventoryState = () => {
  const {inventory} = useCheckup();

  if(inventory) {
    return (
      <Box sx={{mb: 3}}>
        <Typography>現在的背包：{inventory?._id}</Typography>
        <Typography>資料更新於：{new Date(inventory?.cardsUpdatedAt).toLocaleString()}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{mb: 3}}>
      <Typography>不提供活動驗證碼匯入背包的功能，需要在健檢中心設定「公開背包」才可以使用。</Typography>
    </Box>
  );
}

const InventoryDialog = ({open, onClose}) => {
  const {queryInventory, updateInventory} = useCheckup();
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uidInput, setUidInput] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if(open) {
      setUpdateMode(false);
      setMessage("");
      setIsError(false);
    }
  }, [open]);
  useEffect(() => {
    if(!updateMode) setAuthInput("");
  }, [updateMode]);

  const handleLoadInventory = async () => {
    if(!uidInput.match(/^[1-9]\d{6,9}$/)) {
      setMessage("請輸入UID");
      setIsError(true);
      return;
    }
    if(updateMode && !authInput.match(/^\d{6}$/)) {
      setMessage("請輸入活動驗證碼");
      setIsError(true);
      return;
    }
    setLoading(true);
    try {
      if(updateMode) {
        await updateInventory(uidInput, authInput);
      }
      else {
        await queryInventory(uidInput);
      }
      setMessage(`${updateMode ? "更新" : "匯入"}背包成功`);
      setIsError(false);
    }
    catch {
      setMessage(`${updateMode ? "更新" : "匯入"}背包失敗${updateMode ? "" : "，請嘗試使用「更新」功能"}`);
      setIsError(true);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>匯入背包</DialogTitle>
      <StyledDialogContent dividers>
        <InventoryState />
        <ToggleButtonGroup exclusive value={updateMode} onChange={(_, newValue) => setUpdateMode(newValue ?? updateMode)} disabled={loading} color="primary" sx={{mb: 1}}>
          <SwitchButton value={false} disableRipple>匯入</SwitchButton>
          <SwitchButton value={true} disableRipple>更新</SwitchButton>
        </ToggleButtonGroup>
        <NumberField label="UID" value={uidInput} onChange={e => setUidInput(e.target.value)} />
        {updateMode && <NumberField label="活動驗證碼" value={authInput} onChange={e => setAuthInput(e.target.value)} />}
        <Box sx={{mt: 3, position: "relative"}}>
          <Button variant="contained" disabled={loading} onClick={handleLoadInventory}>{updateMode ? "更新" : "匯入"}背包</Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px;"
              }}
            />
          )}
        </Box>
        {message && (
          <Box sx={{mt: 1.5, display: "flex", alignItems: "center"}}>
            {isError
            ? <FailIcon fontSize="small" color="error" sx={{mr: 1}} />
            : <DoneIcon fontSize="small" color="success" sx={{mr: 1}} />}
            <Typography>{message}</Typography>
          </Box>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}

const InventoryFlow = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return <>
    <Tooltip placement="left" arrow title="匯入背包">
      <Fab color="primary" sx={{
        position: "fixed",
        bottom: 86,
        right: 16
      }} onClick={() => setIsDialogOpen(true)}>
        <InventoryIcon />
      </Fab>
    </Tooltip>
    <InventoryDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
  </>;
}

export default InventoryFlow;
