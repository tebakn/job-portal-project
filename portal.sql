--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    job_id integer NOT NULL,
    candidate_id integer NOT NULL,
    status character varying(50) DEFAULT 'applied'::character varying NOT NULL
);


--
-- Name: candidate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidate (
    candidate_id integer NOT NULL,
    cv character varying(50),
    skills character varying(50)
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jobs (
    job_id integer NOT NULL,
    name character varying(50) NOT NULL,
    salary character varying(50),
    department character varying(50) NOT NULL,
    availabilty character varying(50) NOT NULL,
    joining_date date NOT NULL,
    skills character varying(50) NOT NULL,
    isopen character varying(5) DEFAULT true NOT NULL,
    owner_id integer NOT NULL,
    formid integer
);


--
-- Name: personal_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_details (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(50),
    gender character varying(50) NOT NULL,
    phone_number character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    education character varying(50)
);


--
-- Name: recruiter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recruiter (
    recruiter_id integer NOT NULL,
    company character varying(50) NOT NULL
);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.applications (job_id, candidate_id, status) FROM stdin;
3423	3	applied
56	2	applied
\.


--
-- Data for Name: candidate; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.candidate (candidate_id, cv, skills) FROM stdin;
1	http://dummyimage.com/132x179.png/ff4444/ffffff	OSHA Certified
2	\N	PCM
3	http://dummyimage.com/149x164.jpg/cc0000/ffffff	Demand Generation
4	http://dummyimage.com/171x168.png/ff4444/ffffff	IEC 61131-3
5	http://dummyimage.com/109x141.png/5fa2dd/ffffff	CDPE Designation
6	http://dummyimage.com/102x225.png/ff4444/ffffff	OEM Management
7	http://dummyimage.com/150x148.jpg/cc0000/ffffff	OWASP
8	\N	Small Business Online Marketing
9	http://dummyimage.com/134x164.jpg/cc0000/ffffff	Awareness Raising
10	\N	BtB
11	\N	Sports Nutrition
12	http://dummyimage.com/140x222.png/5fa2dd/ffffff	Jury Trials
13	\N	CDL Class A
14	\N	IEEE 802.11
15	\N	DVB-T
16	http://dummyimage.com/240x223.bmp/dddddd/000000	NCAA Compliance
17	\N	EAI
18	http://dummyimage.com/229x142.png/dddddd/000000	ClearCase
19	http://dummyimage.com/229x181.bmp/5fa2dd/ffffff	Web Applications
20	\N	UCC filings
21	\N	Business Ideas
22	\N	GMPLS
23	\N	Intercollegiate Athletics
24	http://dummyimage.com/249x130.jpg/ff4444/ffffff	LLU
25	\N	Business Overhead Expense
26	\N	CCIE
27	\N	Environmental Awareness
28	\N	JPOS
29	\N	KMS
30	http://dummyimage.com/204x162.png/ff4444/ffffff	HP Openview
31	http://dummyimage.com/231x122.png/5fa2dd/ffffff	Quality Auditing
32	\N	Wireless
33	http://dummyimage.com/151x122.bmp/dddddd/000000	IATA
35	\N	XMind
36	http://dummyimage.com/144x139.bmp/5fa2dd/ffffff	Chronic Illness
37	\N	SQL Server Management Studio
38	\N	Class Actions
39	http://dummyimage.com/238x137.jpg/cc0000/ffffff	RFP Generation
40	\N	RMI
41	http://dummyimage.com/119x195.bmp/ff4444/ffffff	Oil Changes
42	http://dummyimage.com/186x223.png/cc0000/ffffff	Guardianship
43	http://dummyimage.com/141x203.png/ff4444/ffffff	Fractional Ownership
44	\N	GBS
45	\N	Target Costing
46	\N	Norton Utilities
47	\N	Kinesio Taping
48	\N	PeopleSoft
49	http://dummyimage.com/216x241.png/dddddd/000000	Animal Nutrition
50	http://dummyimage.com/227x144.png/dddddd/000000	IPO
51	\N	Aircraft
52	http://dummyimage.com/214x136.bmp/ff4444/ffffff	TFTP
53	http://dummyimage.com/169x214.bmp/cc0000/ffffff	DTI
54	\N	gSOAP
55	\N	Logistics
56	http://dummyimage.com/206x164.bmp/ff4444/ffffff	PnL
57	http://dummyimage.com/108x118.jpg/dddddd/000000	First Aid
58	http://dummyimage.com/225x234.bmp/dddddd/000000	Driving License
59	\N	PMIS
60	http://dummyimage.com/236x156.jpg/dddddd/000000	Liability
61	http://dummyimage.com/246x159.bmp/cc0000/ffffff	Umbrella Insurance
62	\N	Crystal Xcelsius 2008
63	\N	Hyperion Reports
64	http://dummyimage.com/130x178.jpg/dddddd/000000	BWA
65	http://dummyimage.com/107x125.bmp/cc0000/ffffff	Conservation Issues
66	http://dummyimage.com/120x172.bmp/5fa2dd/ffffff	Minority Owned
67	http://dummyimage.com/239x242.bmp/5fa2dd/ffffff	Mortgage Banking
68	\N	HtmlUnit
69	\N	Portraits
70	\N	QS1
71	\N	Jewelry
72	http://dummyimage.com/171x166.jpg/cc0000/ffffff	Flight Training
73	http://dummyimage.com/229x111.bmp/ff4444/ffffff	Assurance
74	\N	CEO/CFO Certification
75	http://dummyimage.com/148x153.bmp/ff4444/ffffff	Vlookup
76	http://dummyimage.com/113x134.jpg/ff4444/ffffff	Humanitarian
77	http://dummyimage.com/234x189.bmp/ff4444/ffffff	DNA quantification
78	\N	PSpice
79	http://dummyimage.com/166x132.jpg/5fa2dd/ffffff	BGA
80	\N	DTDs
81	\N	UG
82	http://dummyimage.com/215x133.bmp/ff4444/ffffff	VM
83	http://dummyimage.com/233x215.png/cc0000/ffffff	PTF
84	http://dummyimage.com/127x106.bmp/cc0000/ffffff	VSA
85	http://dummyimage.com/230x228.png/dddddd/000000	HSE Management Systems
86	http://dummyimage.com/209x183.bmp/ff4444/ffffff	Juniper Technologies
87	http://dummyimage.com/229x226.png/dddddd/000000	CCNP Security
88	\N	McKesson PACS
89	\N	Kickstart
90	http://dummyimage.com/169x180.bmp/ff4444/ffffff	FQL
91	\N	SVOD
92	\N	PQRI
93	http://dummyimage.com/200x107.jpg/cc0000/ffffff	Operating Systems
94	http://dummyimage.com/216x241.bmp/ff4444/ffffff	GWAS
95	http://dummyimage.com/210x161.png/ff4444/ffffff	Target Identification
96	http://dummyimage.com/149x172.bmp/5fa2dd/ffffff	IFC
97	\N	TIG Welding
98	\N	Military Logistics
99	\N	Pigments
100	\N	GSP
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.jobs (job_id, name, salary, department, availabilty, joining_date, skills, isopen, owner_id, formid) FROM stdin;
3423	firstjob	34000	undefined	10	2020-03-01	JAVA	false	104	\N
3425	firstjob	34000	undefined	10	2020-03-01	JAVA	true	106	\N
55	firstjob	34000	undefined	10	2020-03-01	JAVA	true	110	\N
56	firstjob	34000	undefined	10	2020-03-01	JAVA	true	119	\N
57	firstjob	undefined	undefined	10	2020-03-01	JAVA	true	119	\N
5555	firstjob	undefined	undefined	10	2020-03-01	JAVA	true	104	\N
\.


--
-- Data for Name: personal_details; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personal_details (user_id, first_name, last_name, email, gender, phone_number, password, username, education) FROM stdin;
1	Gibby	Whiffin	gwhiffin0@e-recht24.de	Male	+33 408 449 2173	Afxaqcno	gwhiffin0	Kansai Medical University
2	Bartolemo	Tuckey	btuckey1@patch.com	Male	+351 521 804 3479	QdQKDtEeFo	btuckey1	Universidad Autónoma de Fresnillo
3	Edithe	Clelland	eclelland2@prlog.org	Female	+86 336 625 8459	DPsJavTMqiXR	eclelland2	Technical University of Mombasa
4	Ernestus	Broadist	ebroadist3@nhs.uk	Male	+86 716 305 5709	7s45nSc09dL	ebroadist3	Samara State Technical University
5	Jasper	Espadero	jespadero4@goodreads.com	Male	+33 712 970 6790	fZpwv3DmER	jespadero4	Southeast University
6	Carlina	Woolaston	cwoolaston5@mtv.com	Female	+258 274 458 1891	cola3fE	cwoolaston5	Universidade de Evora
7	Mel	Fearnehough	mfearnehough6@shop-pro.jp	Male	+54 840 127 4852	S3AHYphRI	mfearnehough6	Princess Nora Bint Abdulrahman University
8	Aida	Rafferty	arafferty7@patch.com	Female	+62 705 829 2780	sSy7c5Sb2	arafferty7	Instituto Tecnológico de Sonora
9	Mitchel	Habbert	mhabbert8@webeden.co.uk	Male	+976 168 284 6987	Kn8iSU	mhabbert8	University of Waikato
10	Fidelia	Shadfourth	fshadfourth9@twitter.com	Female	+7 753 190 1518	klIJhvy	fshadfourth9	Adamson University
11	Ainsley	Crannach	acrannacha@stumbleupon.com	Female	+86 724 775 2643	HOdOfQ	acrannacha	Selangor Islamic University College
12	Eldin	Fishby	efishbyb@theguardian.com	Male	+420 182 659 5902	wdUSaw1l8	efishbyb	Montana State University - Northern
13	Erastus	Ledwidge	eledwidgec@ox.ac.uk	Male	+353 350 213 7800	JUXNIO0QsxY	eledwidgec	Hvanneyri Agricultural University
14	Antonius	Hounson	ahounsond@wufoo.com	Male	+49 923 710 4744	CGxrZWzFk6	ahounsond	University of Wisconsin - Oshkosh
15	Matias	Cluney	mcluneye@alibaba.com	Male	+351 511 876 8618	o0dxYdLRp	mcluneye	Northwest A&F University
16	Skye	Bassham	sbasshamf@jalbum.net	Male	+51 864 162 6891	nVB1YsvKcIkc	sbasshamf	Presidency University
17	Sander	Glaysher	sglaysherg@admin.ch	Male	+48 771 224 0401	FMQTMkG5iSkA	sglaysherg	Ho Chi Minh City University of Law
18	Rennie	Weddup	rwedduph@telegraph.co.uk	Female	+54 491 944 2156	5ZZBKEEEXcn	rwedduph	Université d'Alger
19	Sol	Cassely	scasselyi@microsoft.com	Male	+48 695 155 8415	D8s7ItzunE	scasselyi	Sri Sant Gajanan Maharaj College of Engineering
20	Antoni	Izon	aizonj@1688.com	Male	+48 634 263 5546	rjVXpVW	aizonj	Universidad Blas Pascal
21	Charity	Godbald	cgodbaldk@amazon.co.jp	Female	+86 362 873 5024	ihDF72aAHA	cgodbaldk	Misan University
22	Tammie	Barca	tbarcal@mozilla.org	Male	+260 244 867 7159	kScGPLo	tbarcal	Sudan Academy of Sciences
23	Bronnie	Hammell	bhammellm@t.co	Male	+33 583 355 7223	VN00p1g2c	bhammellm	University of South Australia
24	Pyotr	Turrell	pturrelln@statcounter.com	Male	+62 209 504 2103	i6ucl3q2	pturrelln	Hope Africa University
25	Kim	Spriddle	kspriddleo@sciencedirect.com	Male	+7 884 993 7308	FfDgXOdiqX	kspriddleo	Pyramid Education Center
26	Seymour	Derkes	sderkesp@bandcamp.com	Male	+48 793 255 8758	MucKpNkXdn	sderkesp	University of the Thai Chamber of Commerce
27	Selene	Lawfull	slawfullq@aboutads.info	Female	+62 373 672 0962	18MahHIt	slawfullq	Massey University
28	Perceval	Robilart	probilartr@posterous.com	Male	+976 222 184 9945	14j6W2xEV	probilartr	United States International University
29	Fernanda	Butler-Bowdon	fbutlerbowdons@noaa.gov	Female	+86 546 243 6764	AtuZp34jNXrg	fbutlerbowdons	Annamalai University
30	Leighton	Nassie	lnassiet@amazon.co.jp	Male	+234 303 509 2940	HB2HTl	lnassiet	Midway College
31	Philippine	Buckenham	pbuckenhamu@lulu.com	Female	+86 733 980 8184	LZ5LhEvd8rf	pbuckenhamu	Tamagawa University
32	Nerissa	Ellingsworth	nellingsworthv@psu.edu	Female	+55 368 247 8127	3lHCREST3	nellingsworthv	University “Pavaresia” Vlore
33	Kora	Featherstonhaugh	kfeatherstonhaughw@google.it	Female	+504 942 193 0074	rtNAiELo	kfeatherstonhaughw	Luhansk State Medical University
35	Ximenez	Skillanders	xskillandersy@toplist.cz	Male	+20 287 568 2727	9XkAJ2	xskillandersy	Institut National Polytechnique de Lorraine
36	Godiva	Marchiso	gmarchisoz@ox.ac.uk	Female	+62 599 848 1437	3U3Ir5B	gmarchisoz	Universidad del Pacifico
37	Irene	Celier	icelier10@un.org	Female	+62 598 796 5629	aiGErCU	icelier10	Universidad INCCA de Colombia
38	Lolly	Yurkiewicz	lyurkiewicz11@microsoft.com	Female	+380 518 496 2116	EbiCA3R1B	lyurkiewicz11	St. Mary's College of Maryland
39	Bendick	Toffler	btoffler12@jugem.jp	Male	+7 471 616 8266	F3Hiqeir6	btoffler12	Dickinson College
40	Amargo	Levinge	alevinge13@163.com	Female	+63 711 251 9152	lhMdhnV	alevinge13	Hakodate University
41	Emilee	Dalton	edalton14@ovh.net	Female	+351 890 871 8345	JBIqbT4Z	edalton14	Cheyney University of Pennsylvania
42	Phedra	Danielski	pdanielski15@ebay.co.uk	Female	+420 434 738 2547	KEo2nKBoji	pdanielski15	Northface University
43	Shea	Castaner	scastaner16@ihg.com	Female	+62 338 954 3939	fWxeSxE7K	scastaner16	Universidad de Aquino Bolivia
44	Keenan	Connett	kconnett17@behance.net	Male	+380 685 714 7171	iVQgur	kconnett17	Bloomfield College
45	Thorny	Belfield	tbelfield18@nytimes.com	Male	+30 132 254 1284	pf35ePMSj	tbelfield18	Molloy College
46	Lemmie	Kershow	lkershow19@opera.com	Male	+86 676 969 5534	igdeVnynD3yh	lkershow19	Warner Southern College
47	Hubey	Chataignier	hchataignier1a@nps.gov	Male	+46 678 962 2033	TbsBcyvZ	hchataignier1a	Shanghai Television University
48	Glenn	Bletso	gbletso1b@google.fr	Female	+62 598 690 3105	sWGMz5ez0EL	gbletso1b	Orkhon University
49	Roy	Atter	ratter1c@unc.edu	Male	+86 434 286 3068	1OEExpO6Fq8	ratter1c	Southwest University of Nationalities
50	Marve	Rapper	mrapper1d@zimbio.com	Male	+351 868 377 9309	oBNE6b2OFMsV	mrapper1d	University of Ottawa
51	Milka	Rycraft	mrycraft1e@google.com.br	Female	+242 851 913 0692	bHE9Lx	mrycraft1e	Universidad Autónoma de Centro América
52	Edmon	McKinlay	emckinlay1f@furl.net	Male	+86 210 317 4580	FM2UUW72	emckinlay1f	Institut Supérieur d'Agriculture Rhone-Alpes
53	Sloane	Hanscome	shanscome1g@soup.io	Male	+62 362 992 9901	mVeMMZ4lkzoL	shanscome1g	International College
54	Licha	Etter	letter1h@stumbleupon.com	Female	+230 282 903 3324	jnmmpux9g	letter1h	Christ University
55	Milt	Stucksbury	mstucksbury1i@tinypic.com	Male	+62 344 836 3606	UO9fAX3	mstucksbury1i	Federal University of Technology, Owerri
56	Emmit	Pankethman	epankethman1j@google.com.br	Male	+242 606 219 3965	X38gVUIjEvi	epankethman1j	Université Val-de-Marne (Paris XII)
57	Kittie	Mayling	kmayling1k@webmd.com	Female	+62 688 285 9466	tS60tjqmHBG	kmayling1k	Letourneau University
58	Vinny	Morrice	vmorrice1l@jalbum.net	Female	+86 374 616 8802	dQGpLZL75do	vmorrice1l	London Institute of Management and Technology
59	Kerstin	Ruckhard	kruckhard1m@soup.io	Female	+33 468 809 1742	Ld9TJiyiE	kruckhard1m	Zawiya Academy
60	Tammy	Martinon	tmartinon1n@360.cn	Male	+351 316 548 7998	RhdEnCOu	tmartinon1n	Universidad Maritima de Chile
61	Terrell	Lindenbaum	tlindenbaum1o@csmonitor.com	Male	+7 158 469 8306	ZYnyxhpWTE	tlindenbaum1o	University of Economics Prague
62	Berthe	Boniface	bboniface1p@china.com.cn	Female	+251 828 775 8523	LmuXNA	bboniface1p	Military University Shoumen
63	Marysa	Linnard	mlinnard1q@eventbrite.com	Female	+49 518 161 1451	ACOJaI4A	mlinnard1q	Qinghai University
64	Darby	Potts	dpotts1r@canalblog.com	Male	+62 139 455 3360	OvQQik	dpotts1r	Fachhochschule Kärnten
65	Ignatius	Breznovic	ibreznovic1s@dion.ne.jp	Male	+380 645 321 8043	GYyaKLShL	ibreznovic1s	Ecole Supérieure de Commerce de Nantes-Atlantique
66	Giralda	Wharram	gwharram1t@senate.gov	Female	+62 550 748 5472	8zpwWpVyTZBZ	gwharram1t	University of Science and Technology of China
67	Celesta	Ivanchin	civanchin1u@webmd.com	Female	+55 698 319 1399	oRQrZP	civanchin1u	Himeji Dokkyo University
68	Genevieve	Ilymanov	gilymanov1v@clickbank.net	Female	+51 497 506 8001	Z8tJ8rMKU	gilymanov1v	Ahi Evran University
69	Onofredo	Scoullar	oscoullar1w@blinklist.com	Male	+502 927 140 2496	ve5G6RXyXA	oscoullar1w	Iglobal University
70	Brewer	Malkin	bmalkin1x@topsy.com	Male	+55 271 814 6325	rJYHhX	bmalkin1x	Mohan Lal Sukhadia University
71	Mackenzie	Ferrarese	mferrarese1y@dailymail.co.uk	Male	+86 639 666 6059	sxQpipWqLxu	mferrarese1y	University College of Applied Sciences
72	Ola	MacMaster	omacmaster1z@exblog.jp	Female	+263 173 334 5480	GalzA7cuizD	omacmaster1z	Huron University College
73	Sid	Crowder	scrowder20@last.fm	Male	+55 118 683 0043	Do6B6djZ4o2	scrowder20	Escuela de Administración de Negocios
74	Rianon	Greenroyd	rgreenroyd21@mayoclinic.com	Female	+51 912 107 1045	jDxlF3TH9XW	rgreenroyd21	Pontifcia Università Urbaniana
75	Clarence	Jedrzejkiewicz	cjedrzejkiewicz22@360.cn	Male	+81 862 357 3024	wedwwOL77cC	cjedrzejkiewicz22	Northwood University
76	Mallorie	Lowre	mlowre23@nifty.com	Female	+86 702 928 7259	e0A0juq	mlowre23	Universidad Tecnológica del Centro
77	Binny	Grigolon	bgrigolon24@ezinearticles.com	Female	+86 271 501 2792	HZVHMPmcpwZM	bgrigolon24	Information and Communications Technology Academy
78	Catlaina	Noury	cnoury25@cbc.ca	Female	+86 955 754 0616	3lDf5PeI	cnoury25	Otani University
79	Claudius	Fellgett	cfellgett26@w3.org	Male	+33 664 363 3901	AZRS7gW	cfellgett26	Hochschule Bremerhaven
80	Sydney	O'Gormley	sogormley27@infoseek.co.jp	Male	+63 131 941 2252	gyBnBxvkSt	sogormley27	Nepal Sanskrit University
81	Merrill	Jalland	mjalland28@harvard.edu	Male	+84 392 538 7367	1QZM3YWj	mjalland28	Kitasato University
82	Dana	Daughtrey	ddaughtrey29@gov.uk	Male	+976 761 247 4598	Si4AdgT	ddaughtrey29	Dongseo University
83	Marni	Yuranovev	myuranovev2a@163.com	Female	+351 582 904 4902	Vo3hPNPYW4BU	myuranovev2a	Aichi Bunkyo University
84	Alicea	Stiggles	astiggles2b@columbia.edu	Female	+355 389 419 1100	oQpSLQvkP3	astiggles2b	Pontifícia Universidade Católica de Campinas
85	Erinna	Surphliss	esurphliss2c@usatoday.com	Female	+66 782 889 0318	gueo7G	esurphliss2c	Bangladesh University of Business & Technology
86	Der	Golborn	dgolborn2d@loc.gov	Male	+504 608 217 2065	gFZGzURDVn	dgolborn2d	Ecole Normale Supérieure de Lyon
87	Boony	Kerr	bkerr2e@psu.edu	Male	+86 574 899 4918	N3irHu	bkerr2e	Universidad Autónoma Tomás Frías
88	Silvio	Park	spark2f@phpbb.com	Male	+62 819 227 7509	GRrxMNvCxt4	spark2f	Hehai University
89	Gabey	Braferton	gbraferton2g@cdbaby.com	Female	+63 350 230 0936	aC9VfLD7	gbraferton2g	Universitas Bung Hatta
90	Tyson	Tompsett	ttompsett2h@shareasale.com	Male	+7 966 198 0279	2Ic62DW1g	ttompsett2h	Universiti Darul Iman
91	Heida	Riccetti	hriccetti2i@cpanel.net	Female	+86 884 110 2794	oKKp0KQyMvcQ	hriccetti2i	Kagoshima Women's College
92	Vivien	Carbery	vcarbery2j@histats.com	Female	+385 600 341 8212	eQVsSX7r	vcarbery2j	Pedagogical University of Kielce
93	Jorgan	Hanstock	jhanstock2k@cbsnews.com	Male	+86 557 107 3643	fl8c1ddu	jhanstock2k	Centro Universitario Villanueva
94	Tuckie	Robathon	trobathon2l@icio.us	Male	+60 892 237 0569	4pJBXa9WuKb	trobathon2l	Anhui Medical University
95	Ty	Pooley	tpooley2m@diigo.com	Male	+372 947 508 1485	2zbvffZa8Mt	tpooley2m	Edward Waters College
96	Ediva	Frew	efrew2n@smh.com.au	Female	+33 108 222 2837	FZ0yX9xwQCMr	efrew2n	Mars Hill College
97	Morganica	Gonzalo	mgonzalo2o@fema.gov	Female	+86 402 994 6798	L6salNewd	mgonzalo2o	Delaware State University
98	Joelynn	Antal	jantal2p@jugem.jp	Female	+47 996 796 4792	ijv4a4hjA3X	jantal2p	Fiji School of Medicine
99	Mitzi	Boyer	mboyer2q@walmart.com	Female	+63 364 625 0363	xjoFaWDY	mboyer2q	Taibah University
100	Kingston	Falconar	kfalconar2r@ameblo.jp	Male	+381 756 506 2161	V3uZUAZrNe7	kfalconar2r	University of North Carolina at Greensboro
101	Ivan	Wagge	iwagge0@globo.com	Male	+1 597 270 4471	Zm4aZGGpRejU	iwagge0	Aimst University
102	Zora	Kobke	zkobke1@vk.com	Female	+86 198 287 2050	VVqivd3PKUlo	zkobke1	Roosevelt University
103	Urbano	Stave	ustave2@1und1.de	Male	+1 561 762 4436	TZ7nXUZ	ustave2	University of Nebraska (System)
104	Ainsley	Appleyard	aappleyard3@lycos.com	Female	+39 266 365 2843	Uyl1z8uWW	aappleyard3	University of Perpetual Help
106	Gustav	Tinton	gtinton5@ebay.com	Male	+977 693 176 0618	YPlyuf	gtinton5	Fukuoka International University
107	Sherilyn	Cliffe	scliffe6@skyrock.com	Female	+44 780 761 2974	dvtP8ktoM7	scliffe6	Necmettin Erbakan University
108	Wallache	Reeken	wreeken7@bbb.org	Male	+86 459 816 2775	NlOs5GG	wreeken7	Moscow State University of Geodesy and Cartography
109	Clevie	Boyles	cboyles8@nyu.edu	Male	+86 475 902 7021	IELmRYb	cboyles8	Johannes-Gutenberg Universität Mainz
110	Natalina	Fass	nfass9@unicef.org	Female	+46 206 423 0651	si7xeQWyxTW	nfass9	Medical University Pleven
111	Betteann	Briton	bbritona@deviantart.com	Female	+57 282 987 2063	UaaXgEKDiRRG	bbritona	Technical University of Iasi
112	Lucas	Von Salzberg	lvonsalzbergb@unesco.org	Male	+58 111 230 5168	zH1qSPNGqys	lvonsalzbergb	Zaporizhzhe National Technical University
113	Kari	Lambol	klambolc@exblog.jp	Female	+234 459 114 3781	yy0rGJiclF	klambolc	Universidad Autonoma  de Durango
114	Valentine	Gherardesci	vgherardescid@ftc.gov	Male	+506 118 793 9930	191J4nE0g	vgherardescid	Wisconsin Lutheran College
115	Brodie	Caff	bcaffe@nytimes.com	Male	+62 702 977 2603	OvoIzX	bcaffe	Ecole Spéciale de Mécanique et d'Electricité
116	Tam	Rasher	trasherf@jugem.jp	Male	+66 397 793 6277	8UpCAei2US	trasherf	Institut Teknologi Sepuluh Nopember
117	Vernen	Gaymar	vgaymarg@unesco.org	Male	+62 121 681 0497	bqae9E	vgaymarg	Grove City College
118	Orella	Shillabeare	oshillabeareh@independent.co.uk	Female	+84 598 128 4644	ukr6crCIg	oshillabeareh	Universidad "Juan Agustín Maza"
119	Danielle	Stit	dstiti@hexun.com	Female	+51 282 989 0164	S17diGUY	dstiti	Oakland University
120	Rebeka	Stickins	rstickinsj@independent.co.uk	Female	+81 409 585 5566	WTkI76cDTn	rstickinsj	Universidade Federal de Sergipe
\.


--
-- Data for Name: recruiter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recruiter (recruiter_id, company) FROM stdin;
101	Kaymbo
102	Gevee
103	Devbug
104	Edgewire
106	Rhycero
107	Yamia
108	Twimm
109	Jabbertype
110	Dynazzy
111	Photobug
112	Wikizz
113	Skidoo
114	Thoughtstorm
115	Flashdog
116	Plajo
117	Janyx
118	Jabberbean
119	Chatterbridge
120	Topicware
\.


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (job_id, candidate_id);


--
-- Name: candidate candidate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_pkey PRIMARY KEY (candidate_id);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (job_id);


--
-- Name: personal_details personal_details_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_details
    ADD CONSTRAINT personal_details_email_key UNIQUE (email);


--
-- Name: personal_details personal_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_details
    ADD CONSTRAINT personal_details_pkey PRIMARY KEY (user_id);


--
-- Name: recruiter recruiter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_pkey PRIMARY KEY (recruiter_id);


--
-- Name: applications applications_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate(candidate_id);


--
-- Name: applications applications_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(job_id);


--
-- Name: candidate candidate_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.personal_details(user_id);


--
-- Name: jobs jobs_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.recruiter(recruiter_id);


--
-- Name: recruiter recruiter_recruiter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_recruiter_id_fkey FOREIGN KEY (recruiter_id) REFERENCES public.personal_details(user_id);


--
-- PostgreSQL database dump complete
--

