import { Box, Typography, Button, IconButton } from "@mui/material";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import ImportModal from "./components/ImportModal";
import { LeakStatus, PredictLeaks } from "./js/api";

function App() {

    const [showSettings, setShowSettings] = useState(false);
    const [importModal, setImportModal] = useState(false);

    const [data, setData] = useState({});
    const [prediction, setPrediction] = useState({});
    const [alerts, setAlerts] = useState([]);
    useEffect(() => {

        if (Object.keys(data).length === 0) {
            return;
        }

        LeakStatus().then(response => {
            const temp = Object.values(response.data);
            temp.sort((a, b) => a.Start - b.Start);
            const data = [];
            temp.forEach((item, index) => {
                if (item.Leaks === "0") {
                    item.Leaks = "None";
                }
                data.push(item)
            });
            setAlerts(data.reverse())
        })

    }, [data])

    return (
        <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#111" }}>
            <Map data={data} alerts={alerts} />
            <Box sx={{ height: "100vh", width: "100%", backgroundColor: "#363F4C", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <Box sx={{ padding: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>

                    {
                        !showSettings ? (
                            <>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 2 }}>
                                    <img style={{ width: "50%" }} src={process.env.PUBLIC_URL + "/assets/eog.png"} />
                                    <IconButton onClickCapture={() => setShowSettings(true)}>
                                        <i class="ph-fill ph-gear" style={{ color: "#FFF", fontSize: 20, fontWeight: 500 }} />
                                    </IconButton>
                                </Box>

                                <Box sx={{ height: "100%", width: "100%", backgroundColor: "#FFF", borderRadius: 2, position: "relative" }}>
                                    <Box sx={{ position: "absolute", height: 30, width: 30, borderRadius: 30, backgroundColor: "#FF0000", display: "flex", justifyContent: "center", alignItems: "center", right: -15, top: -15 }}>
                                        <Typography color="#FFF">{alerts.length}</Typography>
                                    </Box>
                                    <Typography style={{ padding: 12 }}>Alerts</Typography>
                                    <Box sx={{ overflow: "scroll", height: 550, paddingX: 2 }}>
                                        {
                                            alerts.map(alert => {
                                                return (
                                                    <Box key={String(alert.Start) + "-" + alert.Leaks} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p>{alert.Leaks}</p>
                                                        <p style={{ fontSize: 13, color: "#888" }}>{new Date(alert.Start).toLocaleTimeString()}</p>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </Box>


                                <Box sx={{ position: "relative", width: "100%", display: "flex", justifyContent: Object.keys(data).length > 0 ? "space-between" : "flex-end" }}>
                                    {
                                        Object.keys(data).length > 0 ? (
                                            <Button variant="contained" color="warning" onClickCapture={() => {
                                                PredictLeaks().then(response => {
                                                    setPrediction(response)
                                                    console.log(response)
                                                })
                                            }}>
                                                Generate Report
                                            </Button>
                                        ) : null
                                    }
                                    <Button variant="contained" startIcon={<i class="ph ph-plus" style={{ color: "#FFF", fontSize: 20, fontWeight: 500 }} />} onClickCapture={() => setImportModal(true)}>Import Data</Button>

                                    <Box sx={{ bottom: Object.keys(prediction).length !== 0 ? 0 : -500, transition: "1s", position: "absolute", width: "100%", gap: 2, display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#FFF", boxShadow: 4, borderRadius: "16px 16px 0px 0px" }}>
                                        <IconButton onClickCapture={() => setPrediction({})}>
                                            <i class="ph ph-x" style={{ color: "#000", fontSize: 20, fontWeight: 500 }} />
                                        </IconButton>
                                        <Typography>Report</Typography>
                                        <Typography>
                                            Precision Accuracy: {prediction.accuracy?.toFixed(2)}
                                        </Typography>
                                        <Typography sx={{ maxHeight: 500, overflow: "scroll" }}>
                                            {
                                                prediction.report?.split("\n").map(item => {
                                                    return (
                                                        <>
                                                            {item}
                                                            <br />
                                                        </>
                                                    )
                                                })
                                                // .forEach(row => {
                                                //     return <p>{row}</p>
                                                // })
                                            }
                                        </Typography>
                                    </Box>
                                </Box>

                            </>
                        ) : (
                            <>
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 2 }}>
                                    <img style={{ width: "50%" }} src={process.env.PUBLIC_URL + "/assets/eog.png"} />
                                    <IconButton onClickCapture={() => setShowSettings(false)}>
                                        <i class="ph ph-x" style={{ color: "#FFF", fontSize: 20, fontWeight: 500 }} />
                                    </IconButton>
                                </Box>

                                <Typography color="#FFF" fontWeight={600}>Settings</Typography>
                                <select>
                                    <option>CSU Metec Lab</option>
                                </select>
                                <Button variant="contained">Update</Button>
                            </>
                        )
                    }

                </Box>
            </Box>
            <ImportModal shown={importModal} setShown={setImportModal} onImport={(data) => setData(data)} />
        </Box>
    );
}

export default App;
