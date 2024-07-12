import React, { useEffect, useRef, useState } from "react";
import Barchart from "./dashboard/Barchart";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import Linechart from "./dashboard/Linechart";
import Piechart from "./dashboard/Piechart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Dashboard = () => {
  const [value, setValue] = React.useState("bar");

  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const parseFinancialString = (value) => {
    let cleanedValue = value.replace(/\$|,/g, "");

    if (cleanedValue.includes("M")) {
      return parseFloat(cleanedValue.replace("M", "")) * 1e6;
    }

    if (cleanedValue.includes("B")) {
      return parseFloat(cleanedValue.replace("B", "")) * 1e9;
    }

    return parseFloat(cleanedValue);
  };

  // Create an axios instance with default headers
  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const BASE_URL = "http://127.0.0.1:8000";

  // < -------------------------------------------------- get  Top Gross Movies --------------------------------------------------

  //   Getting the Years
  const [listofyears, setListofyears] = useState([]);

  const getListofYears = async (query) => {
    console.log("sds", query);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/movie/Moviesyears/`
      );
      // console.log("getOrganisation", response.data);

      setListofyears(response?.data?.Result || []);
    } catch (error) {
      console.error("Error fetching data for Top Gross Movies:", error);
    }
  };

  const [datas, setDatas] = useState([]);
  const [year, setYear] = useState("2011");

  const getTopGrossMovies = async (newValue) => {
    console.log("newValue", newValue);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/movie/TopGrossMovies/?year=${newValue}`
      );
      // console.log("getOrganisation", response.data);

      let data = response.data?.map((item) => ({
        ...item,
        Gross: parseFinancialString(item?.Gross),
      }));
      setDatas(data);
    } catch (error) {
      console.error("Error fetching data for Top Gross Movies:", error);
    }
  };

  // < -------------------------------------------------- get  Top Rating Movies --------------------------------------------------

  const [rating, setRating] = useState([]);
  const getTopRatingMovies = async (newValue) => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/movie/TopRatingMovies/?year=${newValue}`
      );
      console.log("getOrganisation", response.data);
      //   return response.data;
      setRating(response?.data?.Result || []);
    } catch (error) {
      console.error("Error fetching data for Top Rating Movies:", error);
    }
  };

  //    Line Chart
  const [line, setLine] = useState([]);

  const getTopVotesMovies = async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/movie/TopVotesMovies/`
      );
      // console.log("getOrganisation", response.data);
      setLine(response.data || []);
    } catch (error) {
      console.error("Error fetching data for Top Votes Movies:", error);
    }
  };

  //   Upload file
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    console.log("check");
    const file = e.target.files[0];
    console.log("file", file);
    setLoading(true);

    if (file) {
      const formData = new FormData();
      formData.append("movies", file); // Append file to FormData with a name
      console.log("formData", formData);
      axios
        .post(`${BASE_URL}/movie/MoviesDataUpload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate content type
            Accept: "application/json",
          },
        })
        .then((res) => {
          if (res.data?.Result > 0) {
            toast.success("File uploaded successfully", {
              position: "top-right",
              closeButton: true, // Allow manual close
              closeOnClick: true, // Close on click
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoading(false);
          toast.error("Something Went Wrong", {
            position: "top-right",
            closeButton: true, // Allow manual close
            closeOnClick: true, // Close on click
          });
        })
        .finally(() => {
          // Reset the file input value to allow the same file to be uploaded again
          e.target.value = null;
        });
    }
  };

  useEffect(() => {
    getListofYears();
    getTopGrossMovies("2011");
    getTopRatingMovies("2011");
    getTopVotesMovies("2011");
  }, []);

  return (
    <div className="p-4 " style={{ height: "100%" }}>
      <Typography className="text-center fw-bold fs-4">
        Data Visualization Dashboard{" "}
      </Typography>
      <Box
        sx={{ width: "100%" }}
        className="mb-2 d-flex justify-content-between"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab
            value="bar"
            label={
              <Typography sx={{ fontSize: "12px" }}>
                Top Gross Movies
              </Typography>
            }
          />
          <Tab
            value="line"
            label={
              <Typography sx={{ fontSize: "12px" }}>
                Top Votes Movies
              </Typography>
            }
          />
          <Tab
            value="pie"
            label={
              <Typography sx={{ fontSize: "12px" }}>
                Top Rating Movies
              </Typography>
            }
          />
        </Tabs>

        <Button
          className="d-flex gap-2 align-items-center rounded-1 bg-info text-white px-3"
          sx={{ height: "33px" }}
          onClick={handleImportClick}
        >
          <span>
            <IoCloudUploadOutline style={{ fontSize: 18 }} />
          </span>
          <input
            type="file"
            ref={fileInputRef}
            x
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Typography sx={{ textTransform: "capitalize" }}> Import</Typography>
        </Button>
      </Box>
      {loading && ( // Display loader when loading state is true
        <Box
          sx={{
            height: "85%",
            width: "100%",
          }}
          className="d-flex justify-content-center mt-4"
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <ToastContainer />
      {value !== "line" && (
        <div className="d-flex align-items-center justify-content-end">
          <Autocomplete
            style={{ width: "200px" }}
            id="size-small-standard"
            size="small"
            options={listofyears || []}
            getOptionLabel={(option) => option || ""}
            onChange={(e, newValue) => {
              if (value == "bar") {
                getTopGrossMovies(newValue);
              } else if (value == "pie") {
                console.log("newValue1", newValue);
                getTopRatingMovies(newValue);
              } else {
                console.log("newValue2", newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                //   label="Size small"
                placeholder="Choose a year"
              />
            )}
          />
        </div>
      )}
      {value === "bar" && (
        <Card
          className="p-4"
          sx={{ boxShadow: 2, height: "85%", width: "100%" }}
        >
          <Barchart data={datas} legend={["Gross"]} label="Movie_Name" />
        </Card>
      )}
      {value === "line" && (
        <Card
          className="p-4"
          sx={{ boxShadow: 2, height: "85%", width: "100%" }}
        >
          <Linechart data={line} legend={["Votes"]} label="Movie_Name" />
        </Card>
      )}
      {value === "pie" && (
        <Card
          className="p-4"
          sx={{ boxShadow: 2, height: "85%", width: "100%" }}
        >
          <Piechart data={rating} legend={["Rating"]} />
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
