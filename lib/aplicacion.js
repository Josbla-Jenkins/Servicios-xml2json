"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fileUpload = require("express-fileupload");
const xml2js_1 = require("./leonidas/xml2js");
class Aplicacion {
    constructor() {
        this.express = express();
        this.express.use(fileUpload({
            safeFileNames: true,
            preserveExtension: true
        }));
        this.Ruteador();
    }
    Ruteador() {
        let router = express.Router();
        router.post('/upload', (solicitud, respuesta) => {
            let EDFile = solicitud.files.archivo;
            EDFile.mv(`./assets/files-uploaded/${EDFile.name}`, error => {
                if (error) {
                    return respuesta.status(500).send({ mensaje: error });
                }
                else {
                    let xml;
                    xml = `<?xml version="1.0" encoding="UTF-8"?>
                    <rss version="2.0" xmlns:georss="http://www.georss.org/georss" xmlns:media="http://search.yahoo.com/mrss/" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:geoportal="http://www.esri.com/geoportal">
                    <channel>
                    <title>Geoportal GeoRSS.</title>
                    <description>Documentos de metadatos más recientemente actualizados.</description>
                    <link>http://portalgeo.sernageomin.cl/geoportal</link>
                    <docs>http://www.rssboard.org/rss-specification</docs>
                    <category>GeoRss</category>
                    <copyright>Derechos de autor(C) Environmental Systems Research Institute, 2008.</copyright>
                    <generator>Geoportal Extension 9.3.1</generator>
                    <managingEditor>geomin@geomin.cl</managingEditor>
                    <webMaster>geomin@geomin.cl</webMaster>
                    <atom:link rel="search" type="application/opensearchdescription+xml" href="http://portalgeo.sernageomin.cl/geoportal/openSearchDescription" title="Búsqueda en Geoportal"/>
                    <opensearch:totalResults>31</opensearch:totalResults>
                    <opensearch:startIndex>1</opensearch:startIndex>
                    <opensearch:itemsPerPage>10</opensearch:itemsPerPage>
                    <atom:link href="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica" rel="self" type="application/rss+xml" />
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B256D3771-F466-4412-A4A2-C430F26106B0%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B256D3771-F466-4412-A4A2-C430F26106B0%7D</guid>
                    <title>Hoja Arica</title>
                    <pubDate>lun, 09 may 2016 12:07:33 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B256D3771-F466-4412-A4A2-C430F26106B0%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B256D3771-F466-4412-A4A2-C430F26106B0%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.0 -71.0 -18.0 -69.0 -19.0 -69.0 -19.0 -71.0 -18.0 -71.0</georss:polygon>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BE9665D16-9164-4EBA-B338-CA2D8E1BEAB5%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BE9665D16-9164-4EBA-B338-CA2D8E1BEAB5%7D</guid>
                    <title>2007. Peligros del Complejo volcánico Taapaca, región de Arica y Parinacota, Escala 1:50.000</title>
                    <pubDate>vie, 06 may 2016 15:59:52 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/ArcGIS/rest/services/Peligros-Geologicos/M153_PeligrosCVTaapaca/MapServer" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7BE9665D16-9164-4EBA-B338-CA2D8E1BEAB5%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BE9665D16-9164-4EBA-B338-CA2D8E1BEAB5%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-17.9239 -69.6871 -17.9239 -69.3826 -18.2574 -69.3826 -18.2574 -69.6871 -17.9239 -69.6871</georss:polygon>
                    <geoportal:resourceUrl resourceType="ags">http://tienda.sernageomin.cl/ArcGIS/rest/services/Peligros-Geologicos/M153_PeligrosCVTaapaca/MapServer</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B1D84B1CC-D6BC-4606-964A-A5569E833D62%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B1D84B1CC-D6BC-4606-964A-A5569E833D62%7D</guid>
                    <title>2014. Geoquímica de sedimentos de la Hoja Arica, Región de Arica y Parinacota. Escala 1:250.000</title>
                    <pubDate>vie, 06 may 2016 12:04:19 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2657" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B1D84B1CC-D6BC-4606-964A-A5569E833D62%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B1D84B1CC-D6BC-4606-964A-A5569E833D62%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.0 -70.5 -18.0 -69.0 -19.0 -69.0 -19.0 -70.5 -18.0 -70.5</georss:polygon>
                    <geoportal:resourceUrl>http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2657</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B4F18C66B-716B-4553-ABC2-90D9F334628E%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B4F18C66B-716B-4553-ABC2-90D9F334628E%7D</guid>
                    <title>2013. Mapa Preliminar de peligros volcánicos Volcán Parinacota. Región de Arica y Parinacota. Escala 1:75.000</title>
                    <pubDate>vie, 06 may 2016 12:17:54 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2621" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B4F18C66B-716B-4553-ABC2-90D9F334628E%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B4F18C66B-716B-4553-ABC2-90D9F334628E%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.2 -69.4 -18.2 -69.0 -18.6 -69.0 -18.6 -69.4 -18.2 -69.4</georss:polygon>
                    <geoportal:resourceUrl>http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2621</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B16CB891A-2560-4B7E-AFAB-6FE4E6FFC962%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B16CB891A-2560-4B7E-AFAB-6FE4E6FFC962%7D</guid>
                    <title>1980. Cuadrangulos Arica y Poconchile : región de Tarapacá, escala 1:100.000.</title>
                    <pubDate>lun, 09 may 2016 14:57:13 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2324" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B16CB891A-2560-4B7E-AFAB-6FE4E6FFC962%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B16CB891A-2560-4B7E-AFAB-6FE4E6FFC962%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.25 -70.5 -18.25 -70.0 -18.5 -70.0 -18.5 -70.5 -18.25 -70.5</georss:polygon>
                    <geoportal:resourceUrl>http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2324</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B34384F1A-B229-4E28-B605-0BF33A0C5341%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B34384F1A-B229-4E28-B605-0BF33A0C5341%7D</guid>
                    <title>2013. Carta Miñimiñi, Regiones de Arica y Parinacota, y de Tarapacá. Escala 1:100.000</title>
                    <pubDate>vie, 06 may 2016 12:10:13 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2425" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B34384F1A-B229-4E28-B605-0BF33A0C5341%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B34384F1A-B229-4E28-B605-0BF33A0C5341%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-19.0 -70.0 -19.0 -69.5 -19.5 -69.5 -19.5 -70.0 -19.0 -70.0</georss:polygon>
                    <geoportal:resourceUrl>http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2425</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BED0D8E68-70ED-4329-94B5-2B647F3BD6C9%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BED0D8E68-70ED-4329-94B5-2B647F3BD6C9%7D</guid>
                    <title>2014. Carta Camiña, Regiones de Tarapacá y de Arica y Parinacota. Escala 1:100.000</title>
                    <pubDate>lun, 02 may 2016 17:17:29 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2639" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7BED0D8E68-70ED-4329-94B5-2B647F3BD6C9%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BED0D8E68-70ED-4329-94B5-2B647F3BD6C9%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-19.0 -69.5 -19.0 -69.0 -19.5 -69.0 -19.5 -69.5 -19.0 -69.5</georss:polygon>
                    <geoportal:resourceUrl>http://tienda.sernageomin.cl/TiendaVirtual2/ProductDetail.aspx?pid=2639</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B66C3F631-3000-4CCA-AD6B-51A3EDC3675D%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B66C3F631-3000-4CCA-AD6B-51A3EDC3675D%7D</guid>
                    <title>2013. Carta magnética Surire, Región de Arica y Parinacota. Escala 1:100.000</title>
                    <pubDate>vie, 06 may 2016 12:20:09 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M224_SurireMag/MapServer" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B66C3F631-3000-4CCA-AD6B-51A3EDC3675D%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B66C3F631-3000-4CCA-AD6B-51A3EDC3675D%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.5 -69.5 -18.5 -69.0 -19.0 -69.0 -19.0 -69.5 -18.5 -69.5</georss:polygon>
                    <geoportal:resourceUrl resourceType="ags">http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M224_SurireMag/MapServer</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BA70D1363-D7C0-45CF-9A84-0F1540B27CAF%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BA70D1363-D7C0-45CF-9A84-0F1540B27CAF%7D</guid>
                    <title>2012. Carta magnética Codpa, Región de Arica y Parinacota. Escala 1:100.000.</title>
                    <pubDate>vie, 06 may 2016 12:52:47 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M221_CodpaMag/MapServer" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7BA70D1363-D7C0-45CF-9A84-0F1540B27CAF%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7BA70D1363-D7C0-45CF-9A84-0F1540B27CAF%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.5 -70.0 -18.5 -69.5 -19.0 -69.5 -19.0 -70.0 -18.5 -70.0</georss:polygon>
                    <geoportal:resourceUrl resourceType="ags">http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M221_CodpaMag/MapServer</geoportal:resourceUrl>
                    </item>
                    <item>
                    <link>http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B2AC0F6B4-B4F5-4DF1-B883-DF4F46F864EC%7D</link>
                    <guid isPermaLink="true">http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B2AC0F6B4-B4F5-4DF1-B883-DF4F46F864EC%7D</guid>
                    <title>2012. Carta magnética Chaca, Región de Arica y Parinacota. Escala 1:100.000</title>
                    <pubDate>vie, 06 may 2016 12:52:01 -0300</pubDate>
                    <source url="http://portalgeo.sernageomin.cl/geoportal/rest/find/document?searchText=arica">Geoportal GeoRSS.</source>
                    <description><![CDATA[
                    <div class="enlacesBotones1">
                    <div class="enlacesBotones">
                    <a href="http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M220_ChacaMag/MapServer" target="_blank">Abrir</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/catalog/search/resource/details.page?uuid=%7B2AC0F6B4-B4F5-4DF1-B883-DF4F46F864EC%7D" target="_top">Detalles</a>
                    <a href="http://portalgeo.sernageomin.cl/geoportal/rest/document?id=%7B2AC0F6B4-B4F5-4DF1-B883-DF4F46F864EC%7D" target="_blank">Metadatos</a>
                    </div>
                    </div>
                    ]]></description>
                    <category>downloadableData</category>
                    <media:thumbnail url="http://portalgeo.sernageomin.cl/geoportal/catalog/images/ContentType_downloadableData.png"/>
                    <georss:polygon>-18.5 -70.5 -18.5 -70.0 -19.0 -70.0 -19.0 -70.5 -18.5 -70.5</georss:polygon>
                    <geoportal:resourceUrl resourceType="ags">http://tienda.sernageomin.cl/ArcGIS/rest/services/Geofisica/M220_ChacaMag/MapServer</geoportal:resourceUrl>
                    </item>
                    </channel>
                    </rss>`;
                    let resultado = xml2js_1.default.Conversion(xml);
                    console.dir(resultado);
                    return respuesta.status(200).send("wena wn");
                }
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new Aplicacion().express;
//# sourceMappingURL=aplicacion.js.map