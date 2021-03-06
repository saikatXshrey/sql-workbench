import React, { useState, useEffect } from "react";
import { Box, Grid, Alert, Stack, Typography } from "@mui/material";

// components
import { QueryEditor, ActionOutput, TablesInfo } from "./components";

// data
import { queryServer } from "./api";

const App = () => {
  // state
  const [data, setData] = useState([]);
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    queryServer("select * from customers;").then((res) => setData(res));
  }, []);

  console.log(data);

  return (
    <Box m={3}>
      <Stack spacing={5}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h2">SQL Workbench🧢</Typography>
        </Grid>

        {/* query-space */}
        <QueryEditor setBlank={setBlank} setData={setData} />

        {data.length > 0 && <ActionOutput data={data} />}
        {blank ? (
          <Alert severity="warning">Please provide a query!</Alert>
        ) : (
          data.length <= 0 && (
            <Alert severity="error">SQL Syntactical Error!</Alert>
          )
        )}
        {data.info && <Alert severity="info">{data.info}</Alert>}

        {/* db table information */}
        <TablesInfo />
      </Stack>
    </Box>
  );
};

export default App;
