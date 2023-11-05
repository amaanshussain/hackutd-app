import { Box, Button, FormControl, Typography } from "@mui/material";
import { ImportData } from "../js/api";
import { useState } from "react";




export default function ImportModal({ shown, setShown, onImport }) {

    const [sensorFile, setSensorFile] = useState(null);
    const [weatherFile, setWeatherFile] = useState(null);
    const [leakFile, setLeakFile] = useState(null);

    const [loading, setLoading] = useState(false);

    return (
        <Box sx={{ display: shown ? "flex" : "none", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.4)" }}>
            <Box sx={{ width: "40%", padding: 2, backgroundColor: "#FFF", borderRadius: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                    <Button onClickCapture={() => setShown(false)}>Close</Button>
                </Box>

                <Typography style={{ fontSize: 20, fontWeight: 500 }}>Upload Data</Typography>


                <Box sx={{ display: "flex", flexDirection: "column", paddingY: 2, gap: 2 }}>
                    <form>
                        <Typography color="#000" fontWeight={500}>Sensor Data</Typography>
                        <input style={{ color: "#000" }} type="file" name="sensor" onChange={(event) => setSensorFile(event.target.files[0])} />
                        <Typography color="#000" fontWeight={500}>Weather Data</Typography>
                        <input style={{ color: "#000" }} type="file" name="weather" onChange={(event) => setWeatherFile(event.target.files[0])} />
                        <Typography color="#000" fontWeight={500}>Leak Data</Typography>
                        <input style={{ color: "#000" }} type="file" name="leaks" onChange={(event) => setLeakFile(event.target.files[0])} />
                        <br />
                        <br />
                        <Button variant="contained" onClickCapture={() => {

                            setLoading(true);

                            ImportData(sensorFile, weatherFile, leakFile).then(response => {
                                onImport(response.data);
                                setShown(false);
                                setLoading(false);
                            })

                        }}>{loading ? "Loading..." : "Detect Leaks"}</Button>
                    </form>
                </Box>

            </Box>
        </Box>
    )
}