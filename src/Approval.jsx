import React, { useEffect, useState } from "react";
import { db, fetchDataFromFirebase } from "./util";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";

function Approval() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState({
    all: 0,
    self: 0,
    sponsor: 0,
    overQuota: 0,
    waitForApprove: 0,
  });
  const [waitingList, setWaitingList] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        setData(data);
        const count = {
          all: data.filter((item) => !item.discarded).length,
          self: data.filter(
            (item) => item.applyType === "self" && !item.discarded
          ).length,
          sponsor: data.filter((item) => item.applyType === "sponsor").length,
          overQuota: data.filter((item) => item.applyType === "overQuota")
            .length,
          pmk: data.filter((item) => item.applyType === "pmk").length,
        };
        setCount(count);
        const filteredWaiting = data.filter(
          (item) =>
            item.applyType == "self" && !item.approved && !item.discarded
        );
        setWaitingList(filteredWaiting);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleApprove = async (itemId) => {
    try {
      // Get a reference to the collection
      const itemsCollection = collection(db, "register");
      // Get a referce to the specific document
      const itemRef = doc(itemsCollection, itemId);

      // Update the document
      await updateDoc(itemRef, { approved: true, discarded: false });
      console.log("Approve item:", itemId);

      // Update in state
      const updatedWaitingList = waitingList.filter(
        (item) => item.id !== itemId
      );
      setWaitingList(updatedWaitingList);
    } catch (error) {
      console.error("Error approving item:", error);
    }
  };

  const handleDiscard = async (itemId) => {
    try {
      // Get a reference to the collection
      const itemsCollection = collection(db, "register");
      // Get a referce to the specific document
      const itemRef = doc(itemsCollection, itemId);
      // Update the document
      await updateDoc(itemRef, { approved: false, discarded: true });
      console.log("Discard item:", itemId);
      // Update count
      setCount((prevCount) => ({
        ...prevCount,
        all: prevCount.all - 1,
        self: prevCount.self - 1,
      }));
      // Update Waiting List
      const updatedWaitingList = waitingList.filter(
        (item) => item.id !== itemId
      );
      setWaitingList(updatedWaitingList);
    } catch (error) {
      console.error("Error discarding item:", error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      marginTop={1}
    >
      <Grid item margin={0}>
        <Typography variant="h5" component="div">
          Approval
        </Typography>
      </Grid>

      <Grid item>
        {" "}
        {/* Card 1 Item */}
        <Card sx={{ minWidth: 300, maxWidth: 800 }}>
          <CardContent>
            <Typography variant="body1" color="primary">
              ยอดรวม: {count.all} คน
            </Typography>
            <Typography variant="body2">
              ยอดสมัครเอง: {count.self} คน
            </Typography>
            <Typography variant="body2">
              รอการตรวจสอบ: {waitingList.length} คน
            </Typography>
            <Typography variant="body2">
              Sponsored: {count.sponsor} คน
            </Typography>
            <Typography variant="body2">
              Over Quota: {count.overQuota} คน
            </Typography>
            <Typography variant="body2">ลงโดยแผนก: {count.pmk} คน</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        {waitingList.length == 0 ? (
          <Card sx={{ minWidth: 300, maxWidth: 800 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                No waiting list
              </Typography>
            </CardContent>
          </Card>
        ) : (
          waitingList.map((item) => (
            <Card sx={{ minWidth: 300, maxWidth: 800, mb: 2 }} key={item.id}>
              <CardMedia
                component="img"
                alt="Transaction Slip"
                image={item.imageUrl}
                sx={{ width: "100%", objectFit: "cover" }}
              ></CardMedia>
              <CardContent sx={{ py: 1 }}>
                <Typography variant="body2">{item.name}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                {" "}
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  fullWidth
                  onClick={() => handleDiscard(item.id)}
                >
                  Discard
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => handleApprove(item.id)}
                >
                  Approve
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Grid>
    </Grid>
  );
}

export default Approval;
