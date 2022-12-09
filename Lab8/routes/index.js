const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("blueimp-md5");
const publickey = "31ad6d61aaf1fbb32cfd0a1552517454";
const privatekey = "840f7cdb2ea1dc93604204d3b53be769ef1c7faf";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

console.log(url);

async function getData(url) {
    let { data } = await axios.get(url);
    return data;
}
const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        res.render("search", { title: "Character Finder" });
    });
    app.post("/search", async (req, res) => {
        const searchingcharacter = req.body.searchTerm;
        console.log(req.body.searchTerm);
        const searchcharacterurl =
            baseUrl +
            "?nameStartsWith=" +
            searchingcharacter +
            "&ts=" +
            ts +
            "&apikey=" +
            publickey +
            "&hash=" +
            hash;
        console.log(searchcharacterurl);

        if (
            searchingcharacter == null ||
            searchingcharacter.trim().length == 0
        ) {
            res.status(400).render("error", {
                title: "Search term is empty",
            });
            return;
        }
        const dataforcharacter = await getData(searchcharacterurl);
        if (dataforcharacter.data.results.length == 0) {
            res.render("error", {
                title: "Character Not Found",
                Term: searchingcharacter,
            });
            return;
        }

        if (dataforcharacter.data.results.length < 20) {
            res.render("character", {
                title: "Character Found",
                result: dataforcharacter.data.results,
                Term: searchingcharacter,
            });
        } else {
            let a = [];
            for (let i = 0; i < 20; i++) {
                a.push(dataforcharacter.data.results[i]);
            }
            res.render("character", {
                title: "Character Found",
                result: a,
                Term: searchingcharacter,
            });
        }
    });

    app.get("/characters/:id", async (req, res) => {
        try {
            const urlforid =
                baseUrl +
                "/" +
                req.params.id +
                "?ts=" +
                ts +
                "&apikey=" +
                publickey +
                "&hash=" +
                hash;
            const dataatid = await getData(urlforid);

            if (dataatid.data.results.length == 0) {
                res.render("error", {
                    title: "Character Not Found",
                    searchTerm: searchingcharacter,
                });
                return;
            }
            if (dataatid.data.results.length < 20) {
                res.render("details", {
                    result: dataatid.data,
                    name: dataatid.data.results[0].name,
                    image:
                        dataatid.data.results[0].thumbnail.path +
                        "/portrait_xlarge.jpg",
                    description: dataatid.data.results[0].description,
                    comics: dataatid.data.results[0].comics.items,
                });
            } else {
                let a = [];
                for (let i = 0; i < 20; i++) {
                    a.push(dataforcharacter.data.results[i]);
                }
                res.render("details", {
                    result: dataatid.data,
                    name: dataatid.data.results[0].name,
                    image:
                        dataatid.data.results[0].thumbnail.path +
                        "/portrait_xlarge.jpg",
                    description: dataatid.data.results[0].description,
                    comics: dataatid.data.results[0].comics.items,
                });
            }
        } catch (e) {
            res.status(404).render("error", {});
        }

        // console.log(urlforid);
    });
};

module.exports = constructorMethod;
