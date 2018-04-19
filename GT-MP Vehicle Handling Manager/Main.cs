using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace GT_MP_Vehicle_Handling_Manager
{
    public class Main : Script
    {
        public List<Handling> Handlings = new List<Handling>();
        private bool _overwriteAllowed = false;
        private bool _setPlayerHandlingOnConnect = false;
        private int _packetSize = 10;
        private bool _displayDebugMessages = false;

        public Main()
        {
            API.onClientEventTrigger += API_onClientEventTrigger;
            API.onResourceStart += API_onResourceStart;
            API.onResourceStop += API_onResourceStop;
            API.onPlayerFinishedDownload += API_onPlayerFinishedDownload;
        }

        #region Events

        private void API_onPlayerFinishedDownload(Client player)
        {
            if (_setPlayerHandlingOnConnect)
            {
                SetAllHandlings(player, _packetSize);
            }
        }

        private void API_onResourceStop()
        {
            SaveToFile();
        }

        private void API_onResourceStart()
        {
            if (System.IO.File.Exists("handlings.xml"))
            {
                LoadFromFile();
            }
            if (API.hasSetting("sethandlingonconncect"))
            {
                _setPlayerHandlingOnConnect = API.getSetting<bool>("sethandlingonconncect");
            }
            if (API.hasSetting("handlingpacketsize"))
            {
                _packetSize = API.getSetting<int>("handlingpacketsize");
            }
            if (API.hasSetting("showdebugmessages"))
            {
                _displayDebugMessages = API.getSetting<bool>("showdebugmessages");
            }
        }

        private void API_onClientEventTrigger(Client player, string eventName, params object[] arguments)
        {
            switch (eventName)
            {
                case "responseallhandlings":
                    if (!_overwriteAllowed)
                        return;
                    var response = JsonConvert.DeserializeObject<List<Handling>>((string)arguments[0]);
                    if (response != null)
                        Handlings = response;
                    if(_displayDebugMessages)
                        API.consoleOutput(LogCat.Debug, "Fetched " + Handlings.Count + " handlings");
                    _overwriteAllowed = false;
                    SaveToFile();
                    return;
            }
        }

        #endregion Events

        #region Commands

        [Command("renewhandlingdata")]
        public void RenewHandlingDataCmd(Client player)
        {
            RequestAllHandlings(player);
        }

        [Command("applyhandlingdata")]
        public void ApplyHandlingDataCmd(Client player)
        {
            SetAllHandlings(player, _packetSize);
        }

        [Command("applyhandlingdatatoall")]
        public void ApplyHandlingDataToAllCmd(Client player)
        {
            API.getAllPlayers().ForEach(plr =>
            {
                SetAllHandlings(plr, _packetSize);
            });
        }

        #endregion Commands

        #region General Functions

        public void RequestAllHandlings(Client player)
        {
            _overwriteAllowed = true;
            var values = EnumUtil.GetValues<VehicleHash>();
            List<int> vehiclehashes = new List<int>();
            values.ToList().ForEach(veh =>
            {
                vehiclehashes.Add((int)veh);
            });
            player.triggerEvent("gethandlingofvehiclelist", JsonConvert.SerializeObject(vehiclehashes));
        }

        public void SetAllHandlings(Client player, int vehiclePacket)
        {
            List<List<Handling>> handlingslist = new List<List<Handling>>();
            handlingslist.Add(new List<Handling>());
            int count = 0;
            if(_displayDebugMessages)
                API.consoleOutput(LogCat.Debug, "Total Handlings " + Handlings.Count);
            foreach (Handling handling in Handlings)
            {
                if(count < vehiclePacket) 
                {
                    handlingslist[handlingslist.Count - 1].Add(handling);
                }
                else
                {
                    count = 0;
                    handlingslist.Add(new List<Handling> { handling });
                }
                count++;
            }
            if(_displayDebugMessages)
                API.consoleOutput(LogCat.Debug, "Splitted into " + handlingslist.Count + " lists");
            var listcount = 0;
            foreach(List<Handling> handlinglist in handlingslist)
            {
                if(listcount == 0)
                {
                    player.triggerEvent("sethandlingofvehiclelist", JsonConvert.SerializeObject(handlinglist));
                    if(_displayDebugMessages)
                        API.consoleOutput(LogCat.Debug, "Handling Pack 0 with " + handlinglist.Count + " handlings");
                    listcount += 100;
                }
                else
                {
                    API.delay(listcount, true, () =>
                    {
                        player.triggerEvent("sethandlingofvehiclelist", JsonConvert.SerializeObject(handlinglist));
                        if(_displayDebugMessages)
                            API.consoleOutput(LogCat.Debug, "Handling Pack with " + handlinglist.Count + " handlings");
                    });
                    listcount += 100;
                }
            }
        }

        #endregion General Functions

        #region File Functions

        public void SaveToFile()
        {
            XmlSerializer writer =
                new XmlSerializer(typeof(List<Handling>));
            System.IO.FileStream file = System.IO.File.Create("handlings.xml");
            writer.Serialize(file, Handlings);
            file.Close();
            API.consoleOutput(LogCat.Debug, "successfully saved Handlings data to file handlings.xml");
        }

        public void LoadFromFile()
        {
            if (!System.IO.File.Exists("handlings.xml"))
            {
                API.consoleOutput(LogCat.Debug, "handlings.xml doesn't exist..");
                return;
            }
            XmlSerializer reader =
                new XmlSerializer(typeof(List<Handling>));
            System.IO.StreamReader file = new System.IO.StreamReader("handlings.xml");
            var result = (List<Handling>)reader.Deserialize(file);
            file.Close();
            if (result != null)
            {
                Handlings = result;
                API.consoleOutput(LogCat.Debug, "successfully loaded Handlings data from file handlings.xml");
            }
        }

        #endregion File Functions

        #region Helper

        public static class EnumUtil
        {
            public static IEnumerable<T> GetValues<T>()
            {
                return Enum.GetValues(typeof(T)).Cast<T>();
            }
        }

        #endregion Helper
    }
}