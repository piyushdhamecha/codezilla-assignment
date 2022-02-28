import { ChakraProvider, Flex, Grid, theme } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterForm from "./RegisterForm";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex maxW="600px" alignItems="center" mx="auto">
      <Grid minH="100vh" p={3} w="100%">
        <Routes>
          <Route path="/" element={<Navigate replace to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Grid>
    </Flex>
  </ChakraProvider>
);
