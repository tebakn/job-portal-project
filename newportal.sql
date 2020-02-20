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
    status character varying(50) DEFAULT 'applied'::character varying NOT NULL,
    owner_id integer NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: candidate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidate (
    candidate_id integer NOT NULL,
    cv character varying(200),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: candidate_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidate_skill (
    candidate_id integer NOT NULL,
    skills character varying(50) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


--
-- Name: job_skill; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.job_skill (
    job_id integer NOT NULL,
    owner_id integer NOT NULL,
    skills character varying(50) NOT NULL,
    priority integer,
    created_at date,
    updated_at date
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
    isopen character varying(5) DEFAULT true NOT NULL,
    formid integer,
    owner_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
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
    education character varying(200),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: recruiter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recruiter (
    recruiter_id integer NOT NULL,
    company character varying(50) NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.applications (job_id, candidate_id, status, owner_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: candidate; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.candidate (candidate_id, cv, created_at, updated_at) FROM stdin;
1	http://dummyimage.com/190x182.bmp/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
2	http://dummyimage.com/187x167.png/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
3	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
4	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
5	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
6	http://dummyimage.com/210x120.png/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
7	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
8	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
9	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
10	http://dummyimage.com/204x186.png/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
11	http://dummyimage.com/220x215.png/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
12	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
13	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
14	http://dummyimage.com/148x206.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
15	http://dummyimage.com/213x176.bmp/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
16	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
17	http://dummyimage.com/115x222.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
18	http://dummyimage.com/125x202.bmp/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
19	http://dummyimage.com/235x211.bmp/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
20	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
21	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
22	http://dummyimage.com/190x215.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
23	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
24	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
25	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
26	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
27	http://dummyimage.com/111x224.bmp/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
28	http://dummyimage.com/138x142.bmp/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
29	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
30	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
31	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
32	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
33	http://dummyimage.com/213x186.jpg/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
34	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
35	http://dummyimage.com/188x154.jpg/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
36	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
37	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
38	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
39	http://dummyimage.com/134x229.png/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
40	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
41	http://dummyimage.com/135x174.jpg/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
42	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
43	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
44	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
45	http://dummyimage.com/204x222.png/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
46	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
47	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
48	http://dummyimage.com/109x233.jpg/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
49	http://dummyimage.com/232x217.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
50	http://dummyimage.com/126x248.png/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
51	http://dummyimage.com/185x115.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
52	http://dummyimage.com/144x162.jpg/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
53	http://dummyimage.com/105x193.bmp/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
54	http://dummyimage.com/201x142.png/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
55	http://dummyimage.com/161x145.bmp/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
56	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
57	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
58	http://dummyimage.com/237x108.png/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
59	http://dummyimage.com/239x195.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
60	http://dummyimage.com/105x135.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
61	http://dummyimage.com/194x159.jpg/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
62	http://dummyimage.com/158x209.jpg/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
63	http://dummyimage.com/200x170.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
64	http://dummyimage.com/114x170.png/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
65	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
66	http://dummyimage.com/221x221.png/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
67	http://dummyimage.com/112x249.jpg/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
68	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
69	http://dummyimage.com/219x247.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
70	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
71	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
72	http://dummyimage.com/162x206.bmp/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
73	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
74	http://dummyimage.com/216x125.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
75	http://dummyimage.com/144x116.bmp/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
76	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
77	http://dummyimage.com/104x228.bmp/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
78	http://dummyimage.com/178x183.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
79	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
80	http://dummyimage.com/192x187.png/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
81	http://dummyimage.com/206x194.jpg/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
82	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
83	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
84	http://dummyimage.com/239x140.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
85	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
86	http://dummyimage.com/149x221.jpg/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
87	http://dummyimage.com/133x214.jpg/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
88	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
89	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
90	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
91	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
92	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
93	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
94	http://dummyimage.com/234x163.png/ff4444/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
95	http://dummyimage.com/148x117.jpg/5fa2dd/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
96	http://dummyimage.com/160x156.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
97	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
98	\N	2020-02-20 00:00:00	2020-02-20 00:00:00
99	http://dummyimage.com/153x232.png/cc0000/ffffff	2020-02-20 00:00:00	2020-02-20 00:00:00
100	http://dummyimage.com/157x232.png/dddddd/000000	2020-02-20 00:00:00	2020-02-20 00:00:00
\.


--
-- Data for Name: candidate_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.candidate_skill (candidate_id, skills, created_at, updated_at) FROM stdin;
1	Radio	2020-02-20	2020-02-20
1	DxDesigner	2020-02-20	2020-02-20
1	OWA	2020-02-20	2020-02-20
1	Ecological Restoration	2020-02-20	2020-02-20
1	Utility Systems	2020-02-20	2020-02-20
2	Numerical Ability	2020-02-20	2020-02-20
2	McKesson STAR	2020-02-20	2020-02-20
2	CTRM	2020-02-20	2020-02-20
2	CMS	2020-02-20	2020-02-20
2	OS/390	2020-02-20	2020-02-20
3	OTV	2020-02-20	2020-02-20
3	MS Reporting Services	2020-02-20	2020-02-20
3	Hotels	2020-02-20	2020-02-20
3	Urban	2020-02-20	2020-02-20
3	Reaction Kinetics	2020-02-20	2020-02-20
4	Horticulture	2020-02-20	2020-02-20
4	Journalism	2020-02-20	2020-02-20
4	PDS Frameworks	2020-02-20	2020-02-20
4	Sybase IQ	2020-02-20	2020-02-20
4	European History	2020-02-20	2020-02-20
5	Juniper JNCIA	2020-02-20	2020-02-20
5	MIS	2020-02-20	2020-02-20
5	RCFA	2020-02-20	2020-02-20
5	IT Strategy	2020-02-20	2020-02-20
5	Cluster	2020-02-20	2020-02-20
6	XenClient	2020-02-20	2020-02-20
6	EPC	2020-02-20	2020-02-20
6	HVAC Controls	2020-02-20	2020-02-20
6	Nios II	2020-02-20	2020-02-20
6	TFS	2020-02-20	2020-02-20
7	RAN	2020-02-20	2020-02-20
7	DFD	2020-02-20	2020-02-20
7	HDF5	2020-02-20	2020-02-20
7	Arbitration	2020-02-20	2020-02-20
7	DMX	2020-02-20	2020-02-20
8	Lifestyle	2020-02-20	2020-02-20
8	MKS Integrity	2020-02-20	2020-02-20
8	Ethernet over SDH	2020-02-20	2020-02-20
8	Customer Satisfaction	2020-02-20	2020-02-20
8	RUP Methodologies	2020-02-20	2020-02-20
9	Lecturing	2020-02-20	2020-02-20
9	Sun One LDAP	2020-02-20	2020-02-20
9	HEC-HMS	2020-02-20	2020-02-20
9	Zotero	2020-02-20	2020-02-20
9	Water Features	2020-02-20	2020-02-20
10	RMA	2020-02-20	2020-02-20
10	Psychopharmacology	2020-02-20	2020-02-20
10	SFX Editing	2020-02-20	2020-02-20
10	Geology	2020-02-20	2020-02-20
10	Relationship Building	2020-02-20	2020-02-20
11	OLT	2020-02-20	2020-02-20
11	Pre-opening	2020-02-20	2020-02-20
11	ICDL	2020-02-20	2020-02-20
11	Front Office	2020-02-20	2020-02-20
11	NDF	2020-02-20	2020-02-20
12	Music	2020-02-20	2020-02-20
12	Networking	2020-02-20	2020-02-20
12	CQM	2020-02-20	2020-02-20
12	DFT Compiler	2020-02-20	2020-02-20
12	CFDesign	2020-02-20	2020-02-20
13	Switching	2020-02-20	2020-02-20
13	Global Custody	2020-02-20	2020-02-20
13	NDT	2020-02-20	2020-02-20
13	Zymography	2020-02-20	2020-02-20
13	Applicant Tracking Systems	2020-02-20	2020-02-20
14	RNAi	2020-02-20	2020-02-20
14	RFID Applications	2020-02-20	2020-02-20
14	Red Hat Linux	2020-02-20	2020-02-20
14	FMVSS	2020-02-20	2020-02-20
14	Quantitative Research	2020-02-20	2020-02-20
15	GCIH	2020-02-20	2020-02-20
15	ATP	2020-02-20	2020-02-20
15	Sungard GMI	2020-02-20	2020-02-20
15	Open XML	2020-02-20	2020-02-20
15	MbUnit	2020-02-20	2020-02-20
16	Logo Design	2020-02-20	2020-02-20
16	Vocational Rehabilitation	2020-02-20	2020-02-20
16	HMI Programming	2020-02-20	2020-02-20
16	CgFX	2020-02-20	2020-02-20
16	Gastroenterology	2020-02-20	2020-02-20
17	Turf	2020-02-20	2020-02-20
17	FSI	2020-02-20	2020-02-20
17	EHS	2020-02-20	2020-02-20
17	GXT	2020-02-20	2020-02-20
17	Blended Learning	2020-02-20	2020-02-20
18	Epidemiology	2020-02-20	2020-02-20
18	JPEG	2020-02-20	2020-02-20
18	MVVM	2020-02-20	2020-02-20
18	DSL	2020-02-20	2020-02-20
18	Zyxel	2020-02-20	2020-02-20
19	FCRA	2020-02-20	2020-02-20
19	Rollout	2020-02-20	2020-02-20
19	FTTP	2020-02-20	2020-02-20
19	Organizational Behavior	2020-02-20	2020-02-20
19	TMJ Dysfunction	2020-02-20	2020-02-20
20	JWICS	2020-02-20	2020-02-20
20	NMT	2020-02-20	2020-02-20
20	RTGS	2020-02-20	2020-02-20
20	VTK	2020-02-20	2020-02-20
20	Yard Management	2020-02-20	2020-02-20
21	Computer System Validation	2020-02-20	2020-02-20
21	IM	2020-02-20	2020-02-20
21	HCS 2000	2020-02-20	2020-02-20
21	Zebrafish	2020-02-20	2020-02-20
21	Zynx	2020-02-20	2020-02-20
22	FFA	2020-02-20	2020-02-20
22	Analytical Skills	2020-02-20	2020-02-20
22	Vulnerability Management	2020-02-20	2020-02-20
22	Analytical Chemistry	2020-02-20	2020-02-20
22	Business Journalism	2020-02-20	2020-02-20
23	WFC	2020-02-20	2020-02-20
23	HSS	2020-02-20	2020-02-20
23	MLD	2020-02-20	2020-02-20
23	MySQL Cluster	2020-02-20	2020-02-20
23	MRP	2020-02-20	2020-02-20
24	VRU	2020-02-20	2020-02-20
24	WCB	2020-02-20	2020-02-20
24	Escrow	2020-02-20	2020-02-20
24	Httpd	2020-02-20	2020-02-20
24	DLP	2020-02-20	2020-02-20
25	Aircraft Maintenance	2020-02-20	2020-02-20
25	Snorkeling	2020-02-20	2020-02-20
25	IRS	2020-02-20	2020-02-20
25	Eyebrow	2020-02-20	2020-02-20
25	XML Schema	2020-02-20	2020-02-20
26	Personal Injury	2020-02-20	2020-02-20
26	Eggs	2020-02-20	2020-02-20
26	Dogs	2020-02-20	2020-02-20
26	BBx	2020-02-20	2020-02-20
26	Cell Culture	2020-02-20	2020-02-20
27	1H NMR	2020-02-20	2020-02-20
27	OllyDbg	2020-02-20	2020-02-20
27	Marketing Communications	2020-02-20	2020-02-20
27	CI	2020-02-20	2020-02-20
27	Grassroots	2020-02-20	2020-02-20
28	Zumba Instruction	2020-02-20	2020-02-20
28	Amazon S3	2020-02-20	2020-02-20
28	VPLS	2020-02-20	2020-02-20
28	Water	2020-02-20	2020-02-20
28	Jury Trials	2020-02-20	2020-02-20
29	Sybase SQL Anywhere	2020-02-20	2020-02-20
29	RHIA	2020-02-20	2020-02-20
29	PDCA	2020-02-20	2020-02-20
29	Signal Processing	2020-02-20	2020-02-20
29	FF&amp;E Procurement	2020-02-20	2020-02-20
30	Zope	2020-02-20	2020-02-20
30	MBOX	2020-02-20	2020-02-20
30	Rsync	2020-02-20	2020-02-20
30	Odeon	2020-02-20	2020-02-20
30	Teacher Training	2020-02-20	2020-02-20
31	Kalman filtering	2020-02-20	2020-02-20
31	Direct Marketing	2020-02-20	2020-02-20
31	eEmpact	2020-02-20	2020-02-20
31	SMT	2020-02-20	2020-02-20
31	VTR	2020-02-20	2020-02-20
32	IR Spectroscopy	2020-02-20	2020-02-20
32	Epicor	2020-02-20	2020-02-20
32	Cisco VoIP	2020-02-20	2020-02-20
32	IT Outsourcing	2020-02-20	2020-02-20
32	Wovens	2020-02-20	2020-02-20
33	Business Objects	2020-02-20	2020-02-20
33	Joint Ventures	2020-02-20	2020-02-20
33	InDesign	2020-02-20	2020-02-20
33	Drupal	2020-02-20	2020-02-20
33	Dogs	2020-02-20	2020-02-20
34	GMAT	2020-02-20	2020-02-20
34	Special Effects Makeup	2020-02-20	2020-02-20
34	Lubrication	2020-02-20	2020-02-20
34	Year-end Close	2020-02-20	2020-02-20
34	FBD	2020-02-20	2020-02-20
35	Bridge	2020-02-20	2020-02-20
35	MSP430	2020-02-20	2020-02-20
35	ITIL v3 Foundations Certified	2020-02-20	2020-02-20
35	Naval Architecture	2020-02-20	2020-02-20
35	MDF	2020-02-20	2020-02-20
36	FCE	2020-02-20	2020-02-20
36	Nagios	2020-02-20	2020-02-20
36	Style Guides	2020-02-20	2020-02-20
36	XMPie	2020-02-20	2020-02-20
36	GSE	2020-02-20	2020-02-20
37	Overtime	2020-02-20	2020-02-20
37	Medical-Surgical	2020-02-20	2020-02-20
37	Guest Lecturing	2020-02-20	2020-02-20
37	Physicians	2020-02-20	2020-02-20
37	Ukulele	2020-02-20	2020-02-20
38	Private Duty	2020-02-20	2020-02-20
38	Supply Chain Optimization	2020-02-20	2020-02-20
38	Pthreads	2020-02-20	2020-02-20
38	CCNA	2020-02-20	2020-02-20
38	BDCs	2020-02-20	2020-02-20
39	Eye Tracking	2020-02-20	2020-02-20
39	Jasper Reports	2020-02-20	2020-02-20
39	SSADM	2020-02-20	2020-02-20
39	Erwin	2020-02-20	2020-02-20
39	ASME	2020-02-20	2020-02-20
40	Outdoor Kitchens	2020-02-20	2020-02-20
40	MMORPG	2020-02-20	2020-02-20
40	Ubercart	2020-02-20	2020-02-20
40	Guardianship	2020-02-20	2020-02-20
40	HP Server Hardware	2020-02-20	2020-02-20
41	Team Building	2020-02-20	2020-02-20
41	UCM	2020-02-20	2020-02-20
41	Wrongful Death	2020-02-20	2020-02-20
41	Single Family Homes	2020-02-20	2020-02-20
41	Capital Equipment	2020-02-20	2020-02-20
42	Tortoise SVN	2020-02-20	2020-02-20
42	Lesson Planning	2020-02-20	2020-02-20
42	LLVM	2020-02-20	2020-02-20
42	JDOM	2020-02-20	2020-02-20
42	PDE	2020-02-20	2020-02-20
43	EZ Labor	2020-02-20	2020-02-20
43	Zebra	2020-02-20	2020-02-20
43	MVC	2020-02-20	2020-02-20
43	Union	2020-02-20	2020-02-20
43	Rule Of Law	2020-02-20	2020-02-20
44	JCL	2020-02-20	2020-02-20
44	iPhone Application Development	2020-02-20	2020-02-20
44	KVM Switches	2020-02-20	2020-02-20
44	Pyrography	2020-02-20	2020-02-20
44	Early Childhood Literacy	2020-02-20	2020-02-20
45	EOL	2020-02-20	2020-02-20
45	Scripting	2020-02-20	2020-02-20
45	Platform LSF	2020-02-20	2020-02-20
45	FCAPS	2020-02-20	2020-02-20
45	Geometric Dimensioning &amp; Tolerancing	2020-02-20	2020-02-20
46	Sales	2020-02-20	2020-02-20
46	RF Engineering	2020-02-20	2020-02-20
46	Zuken	2020-02-20	2020-02-20
46	Toad	2020-02-20	2020-02-20
46	Ukulele	2020-02-20	2020-02-20
47	Development Economics	2020-02-20	2020-02-20
47	Oracle ERP	2020-02-20	2020-02-20
47	Cyber-security	2020-02-20	2020-02-20
47	PyGTK	2020-02-20	2020-02-20
47	Fire Alarm	2020-02-20	2020-02-20
48	TLC	2020-02-20	2020-02-20
48	MbUnit	2020-02-20	2020-02-20
48	IRI Xlerate	2020-02-20	2020-02-20
48	Citrix	2020-02-20	2020-02-20
48	MTTR	2020-02-20	2020-02-20
49	Avid	2020-02-20	2020-02-20
49	Award Ceremonies	2020-02-20	2020-02-20
49	Test Equipment	2020-02-20	2020-02-20
49	NGP	2020-02-20	2020-02-20
49	Logo Design	2020-02-20	2020-02-20
50	Public Affairs	2020-02-20	2020-02-20
50	AQTF compliance	2020-02-20	2020-02-20
50	P&amp;ID	2020-02-20	2020-02-20
50	Distance Learning	2020-02-20	2020-02-20
50	Engineering	2020-02-20	2020-02-20
51	PNF	2020-02-20	2020-02-20
51	SWIFT Payments	2020-02-20	2020-02-20
51	HSEQ	2020-02-20	2020-02-20
51	JMP	2020-02-20	2020-02-20
51	NG-SDH	2020-02-20	2020-02-20
52	EBMS	2020-02-20	2020-02-20
52	Dog Training	2020-02-20	2020-02-20
52	RED MX	2020-02-20	2020-02-20
52	Commercial Kitchen Design	2020-02-20	2020-02-20
52	Analytics	2020-02-20	2020-02-20
53	Dispute Resolution	2020-02-20	2020-02-20
53	Church Events	2020-02-20	2020-02-20
53	SSIS	2020-02-20	2020-02-20
53	Epidemiology	2020-02-20	2020-02-20
53	Aesthetics	2020-02-20	2020-02-20
54	Teacher Training	2020-02-20	2020-02-20
54	CMC	2020-02-20	2020-02-20
54	BMC Patrol	2020-02-20	2020-02-20
54	GFAAS	2020-02-20	2020-02-20
54	FPLC	2020-02-20	2020-02-20
55	Tier II Reporting	2020-02-20	2020-02-20
55	OGSYS	2020-02-20	2020-02-20
55	WFC	2020-02-20	2020-02-20
55	Health Promotion	2020-02-20	2020-02-20
55	Long-term Customer Relationships	2020-02-20	2020-02-20
56	CTM	2020-02-20	2020-02-20
56	E-on Vue	2020-02-20	2020-02-20
56	Power Generation	2020-02-20	2020-02-20
56	Black &amp; White	2020-02-20	2020-02-20
56	Toxicology	2020-02-20	2020-02-20
57	QSA	2020-02-20	2020-02-20
57	DTD	2020-02-20	2020-02-20
57	VBAC	2020-02-20	2020-02-20
57	QSE	2020-02-20	2020-02-20
57	OA Framework	2020-02-20	2020-02-20
58	Downstream Oil &amp; Gas	2020-02-20	2020-02-20
58	SBR	2020-02-20	2020-02-20
58	XBR	2020-02-20	2020-02-20
58	Iron Ore	2020-02-20	2020-02-20
58	RRIF	2020-02-20	2020-02-20
59	Commercial Kitchen Design	2020-02-20	2020-02-20
59	GPCRs	2020-02-20	2020-02-20
59	Jiu-Jitsu	2020-02-20	2020-02-20
59	Aquatics	2020-02-20	2020-02-20
59	AutoCAD	2020-02-20	2020-02-20
60	Tour Management	2020-02-20	2020-02-20
60	Anti Money Laundering	2020-02-20	2020-02-20
60	401k Rollovers	2020-02-20	2020-02-20
60	Data Management	2020-02-20	2020-02-20
60	Process Efficiency	2020-02-20	2020-02-20
61	PDH	2020-02-20	2020-02-20
61	Drip Irrigation	2020-02-20	2020-02-20
61	TSP	2020-02-20	2020-02-20
61	TPD	2020-02-20	2020-02-20
61	RBI	2020-02-20	2020-02-20
62	EEPROM	2020-02-20	2020-02-20
62	eGRC	2020-02-20	2020-02-20
62	UML Tools	2020-02-20	2020-02-20
62	PWB	2020-02-20	2020-02-20
62	XML Programming	2020-02-20	2020-02-20
63	EPA	2020-02-20	2020-02-20
63	Pro II	2020-02-20	2020-02-20
63	GPON	2020-02-20	2020-02-20
63	Amazon Web Services (AWS)	2020-02-20	2020-02-20
63	Listings	2020-02-20	2020-02-20
64	Quality System	2020-02-20	2020-02-20
64	JNA	2020-02-20	2020-02-20
64	SNAP	2020-02-20	2020-02-20
64	BMD	2020-02-20	2020-02-20
64	Tween	2020-02-20	2020-02-20
65	LynxOS	2020-02-20	2020-02-20
65	Freight Forwarding	2020-02-20	2020-02-20
65	Electric Power	2020-02-20	2020-02-20
65	Quantitative Analytics	2020-02-20	2020-02-20
65	NPL	2020-02-20	2020-02-20
66	Lynx	2020-02-20	2020-02-20
66	Microsoft Exchange	2020-02-20	2020-02-20
66	HDR Photography	2020-02-20	2020-02-20
66	Technical Recruiting	2020-02-20	2020-02-20
66	VC#	2020-02-20	2020-02-20
67	PPPoA	2020-02-20	2020-02-20
67	FQHC	2020-02-20	2020-02-20
67	Rational XDE	2020-02-20	2020-02-20
67	FP	2020-02-20	2020-02-20
67	Eggplant	2020-02-20	2020-02-20
68	ITIL v3 Foundations Certified	2020-02-20	2020-02-20
68	Xoops	2020-02-20	2020-02-20
68	Xenu	2020-02-20	2020-02-20
68	SQL Azure	2020-02-20	2020-02-20
68	SharePoint Designer	2020-02-20	2020-02-20
69	Xen	2020-02-20	2020-02-20
69	Industrial Hygiene	2020-02-20	2020-02-20
69	RSA Ace Server	2020-02-20	2020-02-20
69	pfSense	2020-02-20	2020-02-20
69	Nursing Care	2020-02-20	2020-02-20
70	Big Box	2020-02-20	2020-02-20
70	IT Operations	2020-02-20	2020-02-20
70	Flight Planning	2020-02-20	2020-02-20
70	Occlusion	2020-02-20	2020-02-20
70	Google Webmaster Tools	2020-02-20	2020-02-20
71	PBS	2020-02-20	2020-02-20
71	JUNOS	2020-02-20	2020-02-20
71	EEO	2020-02-20	2020-02-20
71	LPMS	2020-02-20	2020-02-20
71	RRDTool	2020-02-20	2020-02-20
72	Windows NT	2020-02-20	2020-02-20
72	EEOC	2020-02-20	2020-02-20
72	Bootstrap	2020-02-20	2020-02-20
72	DMMs	2020-02-20	2020-02-20
72	Kinect	2020-02-20	2020-02-20
73	XFP	2020-02-20	2020-02-20
73	XCOM	2020-02-20	2020-02-20
73	Special Effects Makeup	2020-02-20	2020-02-20
73	Manual Therapy	2020-02-20	2020-02-20
73	LGBT Rights	2020-02-20	2020-02-20
74	CD packaging	2020-02-20	2020-02-20
74	Online Marketing	2020-02-20	2020-02-20
74	WTP	2020-02-20	2020-02-20
74	Human Capital Management	2020-02-20	2020-02-20
74	Software Quality Assurance	2020-02-20	2020-02-20
75	Tour Operators	2020-02-20	2020-02-20
75	Health Promotion	2020-02-20	2020-02-20
75	Distance Learning	2020-02-20	2020-02-20
75	Glamour	2020-02-20	2020-02-20
75	Ultra Low Latency	2020-02-20	2020-02-20
76	TPU	2020-02-20	2020-02-20
76	DBE	2020-02-20	2020-02-20
76	Purchasing	2020-02-20	2020-02-20
76	WMI	2020-02-20	2020-02-20
76	Sage ERP X3	2020-02-20	2020-02-20
77	Fences	2020-02-20	2020-02-20
77	HRO	2020-02-20	2020-02-20
77	HTRF	2020-02-20	2020-02-20
77	Jury Trials	2020-02-20	2020-02-20
77	Quantity Surveying	2020-02-20	2020-02-20
78	JavaSE	2020-02-20	2020-02-20
78	Jenark	2020-02-20	2020-02-20
78	PowerPoint	2020-02-20	2020-02-20
78	SGBD	2020-02-20	2020-02-20
78	Umbraco	2020-02-20	2020-02-20
79	Type Approval	2020-02-20	2020-02-20
79	WF	2020-02-20	2020-02-20
79	Target Costing	2020-02-20	2020-02-20
79	Income Tax	2020-02-20	2020-02-20
79	Analysis	2020-02-20	2020-02-20
80	Brand Management	2020-02-20	2020-02-20
80	DVP&amp;R	2020-02-20	2020-02-20
80	FME	2020-02-20	2020-02-20
80	Logging	2020-02-20	2020-02-20
80	TTP	2020-02-20	2020-02-20
81	VMS	2020-02-20	2020-02-20
81	Cardiology	2020-02-20	2020-02-20
81	DHCPv6	2020-02-20	2020-02-20
81	OASIS	2020-02-20	2020-02-20
81	Corporate Branding	2020-02-20	2020-02-20
82	Online Research	2020-02-20	2020-02-20
82	Fashion GPS	2020-02-20	2020-02-20
82	CDL Class A	2020-02-20	2020-02-20
82	Boilers	2020-02-20	2020-02-20
82	CNC Programing	2020-02-20	2020-02-20
83	Kitchen Cabinets	2020-02-20	2020-02-20
83	HTA	2020-02-20	2020-02-20
83	UK Employment Law	2020-02-20	2020-02-20
83	Digital Illustration	2020-02-20	2020-02-20
83	Web Typography	2020-02-20	2020-02-20
84	Kronos WFC	2020-02-20	2020-02-20
84	RCRA	2020-02-20	2020-02-20
84	Submittals	2020-02-20	2020-02-20
84	Knee	2020-02-20	2020-02-20
84	Firewalls	2020-02-20	2020-02-20
85	Objective-C	2020-02-20	2020-02-20
85	Bodywork	2020-02-20	2020-02-20
85	Youth Ministry	2020-02-20	2020-02-20
85	Electric Power	2020-02-20	2020-02-20
85	Clinical Psychology	2020-02-20	2020-02-20
86	Norton Ghost	2020-02-20	2020-02-20
86	Working With Children	2020-02-20	2020-02-20
86	Back Office	2020-02-20	2020-02-20
86	OMAP	2020-02-20	2020-02-20
86	RWD Info Pak	2020-02-20	2020-02-20
87	IWR	2020-02-20	2020-02-20
87	Ambulatory Care	2020-02-20	2020-02-20
87	JSONP	2020-02-20	2020-02-20
87	Current Affairs	2020-02-20	2020-02-20
87	Owners Representative	2020-02-20	2020-02-20
88	Wellbeing	2020-02-20	2020-02-20
88	Classroom	2020-02-20	2020-02-20
88	Call Centers	2020-02-20	2020-02-20
88	Kaizen	2020-02-20	2020-02-20
88	RTO	2020-02-20	2020-02-20
89	PnL	2020-02-20	2020-02-20
89	SV	2020-02-20	2020-02-20
89	OSGi	2020-02-20	2020-02-20
89	Time-efficient	2020-02-20	2020-02-20
89	Voice Acting	2020-02-20	2020-02-20
90	Urban Agriculture	2020-02-20	2020-02-20
90	Energy Efficiency	2020-02-20	2020-02-20
90	HBDI	2020-02-20	2020-02-20
90	VBScript	2020-02-20	2020-02-20
90	SMT Kingdom	2020-02-20	2020-02-20
91	HIPAA	2020-02-20	2020-02-20
91	Eye Exams	2020-02-20	2020-02-20
91	IVDD	2020-02-20	2020-02-20
91	RCSA	2020-02-20	2020-02-20
91	PPAP	2020-02-20	2020-02-20
92	Mobile Technology	2020-02-20	2020-02-20
92	Instructional Design	2020-02-20	2020-02-20
92	ICP-MS	2020-02-20	2020-02-20
92	Employee Training	2020-02-20	2020-02-20
92	EAI	2020-02-20	2020-02-20
93	Wound Care	2020-02-20	2020-02-20
93	Quality by Design	2020-02-20	2020-02-20
93	Oil &amp; Gas Industry	2020-02-20	2020-02-20
93	Pivot Tables	2020-02-20	2020-02-20
93	Swedish	2020-02-20	2020-02-20
94	Intergovernmental Affairs	2020-02-20	2020-02-20
94	VRTX	2020-02-20	2020-02-20
94	CFIA	2020-02-20	2020-02-20
94	Cfengine	2020-02-20	2020-02-20
94	European Integration	2020-02-20	2020-02-20
95	Market Knowledge	2020-02-20	2020-02-20
95	UMTS	2020-02-20	2020-02-20
95	MFG-Pro	2020-02-20	2020-02-20
95	Erwin	2020-02-20	2020-02-20
95	IDX	2020-02-20	2020-02-20
96	Fund Of Funds	2020-02-20	2020-02-20
96	General Surgery	2020-02-20	2020-02-20
96	Yield	2020-02-20	2020-02-20
96	Agile Methodologies	2020-02-20	2020-02-20
96	Improvisation	2020-02-20	2020-02-20
97	DGGE	2020-02-20	2020-02-20
97	Vessel Operations	2020-02-20	2020-02-20
97	VxWorks	2020-02-20	2020-02-20
97	Roth IRA	2020-02-20	2020-02-20
97	WSDL	2020-02-20	2020-02-20
98	CND	2020-02-20	2020-02-20
98	Sage 300 ERP	2020-02-20	2020-02-20
98	CNC Manufacturing	2020-02-20	2020-02-20
98	CCIM	2020-02-20	2020-02-20
98	Recombinant DNA	2020-02-20	2020-02-20
99	Multi-channel Marketing	2020-02-20	2020-02-20
99	Axys	2020-02-20	2020-02-20
99	Oracle Identity Manager	2020-02-20	2020-02-20
99	White Collar Criminal Defense	2020-02-20	2020-02-20
99	Doors	2020-02-20	2020-02-20
100	HAZOP Study	2020-02-20	2020-02-20
100	OLT	2020-02-20	2020-02-20
100	Customer Service	2020-02-20	2020-02-20
100	FM Radio	2020-02-20	2020-02-20
100	VMware	2020-02-20	2020-02-20
\.


--
-- Data for Name: job_skill; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.job_skill (job_id, owner_id, skills, priority, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.jobs (job_id, name, salary, department, availabilty, joining_date, isopen, formid, owner_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: personal_details; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personal_details (user_id, first_name, last_name, email, gender, phone_number, password, username, education, created_at, updated_at) FROM stdin;
1	Alethea	Muat	amuat0@free.fr	Female	+33 388 273 6501	vIIPWIm6MXuU	amuat0	Taiz University	2020-02-20 00:00:00	2020-02-20 00:00:00
2	Reese	Brinicombe	rbrinicombe1@comsenz.com	Male	+420 464 909 1871	wiBBQmrYY	rbrinicombe1	Bob Jones University	2020-02-20 00:00:00	2020-02-20 00:00:00
3	Granny	Fuentez	gfuentez2@reddit.com	Male	+62 222 401 5543	jBBz7t1sUwR	gfuentez2	Prairie View Agricultural and Mechanical University	2020-02-20 00:00:00	2020-02-20 00:00:00
4	Lavena	Bolles	lbolles3@whitehouse.gov	Female	+1 106 242 6718	HdkYl1S6	lbolles3	King Faisal University	2020-02-20 00:00:00	2020-02-20 00:00:00
5	Xerxes	Doolan	xdoolan4@businessweek.com	Male	+55 338 389 3184	DyjC68	xdoolan4	Universidad Autónoma de Guadalajara	2020-02-20 00:00:00	2020-02-20 00:00:00
6	Julianna	Burdin	jburdin5@lycos.com	Female	+86 263 477 5635	9QNm3IdzKJk	jburdin5	Houdegbe North American University Benin	2020-02-20 00:00:00	2020-02-20 00:00:00
7	Ray	Drakes	rdrakes6@unesco.org	Female	+86 630 660 1082	MGytXNyoH	rdrakes6	University of Agriculture and Veterinary Medicine Timisoara	2020-02-20 00:00:00	2020-02-20 00:00:00
8	Joey	Maro	jmaro7@timesonline.co.uk	Male	+86 689 215 0328	AMZWXFQCc9	jmaro7	 Akanu Ibiam Federal Polytechnic, Unwana	2020-02-20 00:00:00	2020-02-20 00:00:00
9	Kyle	Gurg	kgurg8@blogs.com	Female	+55 482 289 6806	hD8jJywwVi	kgurg8	Universidad de Ciencias de la Informatica	2020-02-20 00:00:00	2020-02-20 00:00:00
10	Lavinie	Millery	lmillery9@elpais.com	Female	+33 661 712 4785	6XHcGU	lmillery9	New York Law School	2020-02-20 00:00:00	2020-02-20 00:00:00
11	Ibby	Le Pine	ilepinea@yelp.com	Female	+54 821 764 4930	hOJlddnfYHXd	ilepinea	Shandong Agricultural University	2020-02-20 00:00:00	2020-02-20 00:00:00
12	Creighton	Celli	ccellib@nhs.uk	Male	+62 317 488 1443	LWdvHWxw	ccellib	Centro Universitario Villanueva	2020-02-20 00:00:00	2020-02-20 00:00:00
13	Fonsie	Sustin	fsustinc@businessinsider.com	Male	+58 441 406 7317	SHIFth8zb4	fsustinc	Carthage College	2020-02-20 00:00:00	2020-02-20 00:00:00
14	Woody	Shoobridge	wshoobridged@yelp.com	Male	+62 818 158 6464	27sSstzL5Zc	wshoobridged	Maxim Gorky Institute of Literature	2020-02-20 00:00:00	2020-02-20 00:00:00
15	Kay	Van Arsdale	kvanarsdalee@netvibes.com	Female	+64 369 176 5908	dadlqL	kvanarsdalee	Humber College	2020-02-20 00:00:00	2020-02-20 00:00:00
16	Maggy	Cane	mcanef@admin.ch	Female	+31 236 462 5312	ZaE7nI85z	mcanef	Instituto Tecnológico de Celaya	2020-02-20 00:00:00	2020-02-20 00:00:00
17	Hyacinthe	Gimlet	hgimletg@intel.com	Female	+63 329 128 1566	t5Lmt8s940	hgimletg	Sultan Salahuddin Abdul Aziz Shah Polytechnic	2020-02-20 00:00:00	2020-02-20 00:00:00
18	Neall	Bunton	nbuntonh@census.gov	Male	+86 584 644 1738	9Hzr5EghNVo	nbuntonh	Assiut University	2020-02-20 00:00:00	2020-02-20 00:00:00
19	Lilla	Troctor	ltroctori@imdb.com	Female	+249 606 147 0706	5wvXQG	ltroctori	Kirikkale University	2020-02-20 00:00:00	2020-02-20 00:00:00
20	Jake	Keuneke	jkeunekej@ucoz.ru	Male	+351 827 686 2529	p5yL4QE	jkeunekej	University of Macerata	2020-02-20 00:00:00	2020-02-20 00:00:00
21	Cassandre	Knibley	cknibleyk@mediafire.com	Female	+386 233 258 8844	svKtLD3wkcA	cknibleyk	Fachhochschule Schwäbisch Gmünd, Hochschule für Gestaltung	2020-02-20 00:00:00	2020-02-20 00:00:00
22	Ludvig	Hallmark	lhallmarkl@ask.com	Male	+381 425 122 4348	zDrYtr	lhallmarkl	Northrise University	2020-02-20 00:00:00	2020-02-20 00:00:00
23	Chris	Campkin	ccampkinm@virginia.edu	Female	+86 866 845 0953	UuY3glVC	ccampkinm	Gauhati University	2020-02-20 00:00:00	2020-02-20 00:00:00
24	Harmonia	Capineer	hcapineern@narod.ru	Female	+375 277 862 5650	bKCQJKFqf04	hcapineern	Universidad del Valle de Guatemala	2020-02-20 00:00:00	2020-02-20 00:00:00
25	Killy	Edelston	kedelstono@bloglines.com	Male	+63 230 923 1907	6d1E3ftr	kedelstono	Albertus Magnus College	2020-02-20 00:00:00	2020-02-20 00:00:00
26	Link	Brand-Hardy	lbrandhardyp@engadget.com	Male	+62 304 424 0666	5yvvVK4o	lbrandhardyp	Susquehanna University	2020-02-20 00:00:00	2020-02-20 00:00:00
27	Alina	Orsay	aorsayq@skype.com	Female	+502 576 672 2577	zSdkOpMuIMv	aorsayq	Glasgow Caledonian University	2020-02-20 00:00:00	2020-02-20 00:00:00
28	Gabriel	Mercik	gmercikr@ftc.gov	Male	+46 891 874 9929	lHe0gzKQfHcE	gmercikr	Chukyo Women's University	2020-02-20 00:00:00	2020-02-20 00:00:00
29	Aguie	Koppe	akoppes@google.com	Male	+48 411 301 7204	xCZN4F	akoppes	University of the West Indies, Cave Hill	2020-02-20 00:00:00	2020-02-20 00:00:00
30	Sharona	Speak	sspeakt@utexas.edu	Female	+86 668 440 6394	htAAbVKcp	sspeakt	University of Missouri - Columbia	2020-02-20 00:00:00	2020-02-20 00:00:00
31	Izak	O'Spillane	iospillaneu@blogtalkradio.com	Male	+594 761 608 6185	KR4EqUe94	iospillaneu	American University of Science and Technology	2020-02-20 00:00:00	2020-02-20 00:00:00
32	Katlin	Bartoszek	kbartoszekv@latimes.com	Female	+52 596 848 0268	xGzjyBTnqacF	kbartoszekv	Umea University	2020-02-20 00:00:00	2020-02-20 00:00:00
33	Kenyon	Eshelby	keshelbyw@phpbb.com	Male	+86 807 956 9928	bH074p	keshelbyw	Osaka University of Pharmaceutical Sciences	2020-02-20 00:00:00	2020-02-20 00:00:00
34	Meggie	Checklin	mchecklinx@infoseek.co.jp	Female	+55 547 588 9261	lkJYKA8	mchecklinx	University of Patras	2020-02-20 00:00:00	2020-02-20 00:00:00
35	Osborn	Marchbank	omarchbanky@amazon.de	Male	+63 845 555 5086	KVKJqUZ6S	omarchbanky	Lynn University	2020-02-20 00:00:00	2020-02-20 00:00:00
36	Brittni	Raisbeck	braisbeckz@smugmug.com	Female	+375 605 812 2789	FQoqfQRJofx	braisbeckz	Universidad Pedagógica de El Salvador	2020-02-20 00:00:00	2020-02-20 00:00:00
37	Abbott	Naper	anaper10@craigslist.org	Male	+355 855 709 3258	3WVMArSRHeM	anaper10	Community College of Denver	2020-02-20 00:00:00	2020-02-20 00:00:00
38	Nick	Crosswaite	ncrosswaite11@t-online.de	Male	+27 871 648 0769	SwmzskN0FBS	ncrosswaite11	Mahatma Gandhi Chitrakut Gramoday University	2020-02-20 00:00:00	2020-02-20 00:00:00
39	Ebba	Paulton	epaulton12@amazon.com	Female	+86 658 972 7746	ZWQqQyEhTis	epaulton12	Gorgan University of Agricultural Sciences and Natural Resources	2020-02-20 00:00:00	2020-02-20 00:00:00
40	Augustina	Suart	asuart13@ebay.co.uk	Female	+63 379 857 0921	0cRQTaWozM3q	asuart13	University of Calgary	2020-02-20 00:00:00	2020-02-20 00:00:00
41	Alisander	Kubczak	akubczak14@trellian.com	Male	+46 546 260 7154	s5N2wvwYwW	akubczak14	Mehrabyan Medical Institute and Medical College	2020-02-20 00:00:00	2020-02-20 00:00:00
42	Gram	Bunnell	gbunnell15@imdb.com	Male	+1 107 899 2913	OmqRjtGwn45t	gbunnell15	Universidad Tecnológica de Honduras	2020-02-20 00:00:00	2020-02-20 00:00:00
43	Leila	Wellstood	lwellstood16@technorati.com	Female	+226 766 600 5496	hJZFvZH	lwellstood16	Zetech College	2020-02-20 00:00:00	2020-02-20 00:00:00
44	Leyla	Laurent	llaurent17@umn.edu	Female	+86 802 474 1205	FhrHNIdRavb	llaurent17	Universidade Estadual da Paraíba	2020-02-20 00:00:00	2020-02-20 00:00:00
45	Marybeth	de Tocqueville	mdetocqueville18@themeforest.net	Female	+62 284 876 1725	dB88gD8Z	mdetocqueville18	National University of Management	2020-02-20 00:00:00	2020-02-20 00:00:00
46	Dacey	MacLeod	dmacleod19@twitter.com	Female	+60 911 626 2024	OrKgy306rp	dmacleod19	Augustana University College	2020-02-20 00:00:00	2020-02-20 00:00:00
47	Pedro	Stallwood	pstallwood1a@businesswire.com	Male	+351 224 679 6074	0PSQ0h	pstallwood1a	Khana-e-Noor Institute of Higher Education	2020-02-20 00:00:00	2020-02-20 00:00:00
48	Christie	Daen	cdaen1b@surveymonkey.com	Male	+48 581 508 6300	64XFLa7Vyb7	cdaen1b	Southern Arkansas University	2020-02-20 00:00:00	2020-02-20 00:00:00
49	Dominik	McNern	dmcnern1c@networkadvertising.org	Male	+98 261 380 3514	TS6NCLrtKjC4	dmcnern1c	Cambodian Mekong University	2020-02-20 00:00:00	2020-02-20 00:00:00
50	Christiana	Sporle	csporle1d@youtube.com	Female	+86 217 857 0829	IGPSwkf5m	csporle1d	Philippine Military Academy	2020-02-20 00:00:00	2020-02-20 00:00:00
51	Abbi	Basham	abasham1e@guardian.co.uk	Female	+62 973 225 6960	UbRp9PYI8gJA	abasham1e	City University of New York, Medgar Evers College	2020-02-20 00:00:00	2020-02-20 00:00:00
52	Paola	Ovenden	povenden1f@aboutads.info	Female	+46 887 399 9909	YOsxq4H	povenden1f	National Defense University	2020-02-20 00:00:00	2020-02-20 00:00:00
53	Flossi	Shory	fshory1g@washingtonpost.com	Female	+98 452 233 2448	yuZfyP	fshory1g	Anhui Technical College of Water Resources and Hydroelectric Power	2020-02-20 00:00:00	2020-02-20 00:00:00
54	Carlynne	Carnelley	ccarnelley1h@oaic.gov.au	Female	+62 566 217 5065	HR9NfxBbZTby	ccarnelley1h	Tomsk State University	2020-02-20 00:00:00	2020-02-20 00:00:00
55	Johny	Killoran	jkilloran1i@usatoday.com	Male	+46 279 501 3089	bp4lH5yif	jkilloran1i	Cornish College of the Arts	2020-02-20 00:00:00	2020-02-20 00:00:00
56	Kennie	McPhelimey	kmcphelimey1j@bluehost.com	Male	+86 724 831 3048	zSWj8aHKeK	kmcphelimey1j	National Kaohsiung University of Applied Sciences	2020-02-20 00:00:00	2020-02-20 00:00:00
57	Lorrie	Hansford	lhansford1k@flavors.me	Female	+54 139 218 4338	wQQA0J31hvi	lhansford1k	Dhaka International University	2020-02-20 00:00:00	2020-02-20 00:00:00
58	Drugi	Nobles	dnobles1l@sphinn.com	Male	+254 998 321 3494	x88B0STah3	dnobles1l	Jaipur National University	2020-02-20 00:00:00	2020-02-20 00:00:00
59	Dulcea	M'Quharg	dmquharg1m@barnesandnoble.com	Female	+86 183 648 6913	INXJtllp6uDR	dmquharg1m	Meiji University	2020-02-20 00:00:00	2020-02-20 00:00:00
60	Laurie	Hounsom	lhounsom1n@cafepress.com	Female	+55 719 206 7068	X0sg7y	lhounsom1n	Royal Military Academy	2020-02-20 00:00:00	2020-02-20 00:00:00
61	Faulkner	Dory	fdory1o@1und1.de	Male	+20 257 968 5839	yKAmFX3PyASn	fdory1o	Gorno-Altaisk State University	2020-02-20 00:00:00	2020-02-20 00:00:00
62	Aeriell	Whybrow	awhybrow1p@techcrunch.com	Female	+86 526 113 2416	riLH2kr	awhybrow1p	Business School Lausanne (BSL)	2020-02-20 00:00:00	2020-02-20 00:00:00
63	Cherie	Embra	cembra1q@prweb.com	Female	+66 101 431 3513	LfD1zZO7g2	cembra1q	Technical University of Radom	2020-02-20 00:00:00	2020-02-20 00:00:00
64	Dino	Aldhouse	daldhouse1r@constantcontact.com	Male	+86 563 920 5005	6KHb2GymnI	daldhouse1r	Brigham Young University	2020-02-20 00:00:00	2020-02-20 00:00:00
65	Tallie	Kofax	tkofax1s@ftc.gov	Male	+55 448 154 1613	5X2Q2mjQ6NC7	tkofax1s	University of Tuzla	2020-02-20 00:00:00	2020-02-20 00:00:00
66	Adara	Meah	ameah1t@nature.com	Female	+86 759 445 3011	YnmhrmzxrS	ameah1t	Tibet Tibetan Medical College	2020-02-20 00:00:00	2020-02-20 00:00:00
67	Neal	Pirt	npirt1u@shareasale.com	Male	+30 193 638 0979	Oogp5Pn	npirt1u	Humphreys College	2020-02-20 00:00:00	2020-02-20 00:00:00
68	Nadya	MacCulloch	nmacculloch1v@va.gov	Female	+86 297 930 2219	7SqknY8wn	nmacculloch1v	University of Regina Carmeli	2020-02-20 00:00:00	2020-02-20 00:00:00
69	Ingram	Apfler	iapfler1w@craigslist.org	Male	+86 716 299 5194	Eu9krAd9b	iapfler1w	Qufu Normal University	2020-02-20 00:00:00	2020-02-20 00:00:00
70	Mill	Akhurst	makhurst1x@amazon.de	Male	+62 562 814 1381	jTd1MQb	makhurst1x	University of Ilorin	2020-02-20 00:00:00	2020-02-20 00:00:00
71	Abdel	Meaker	ameaker1y@about.me	Male	+33 699 182 7360	ATe4GQs	ameaker1y	Pan-African University	2020-02-20 00:00:00	2020-02-20 00:00:00
72	Nevin	Godney	ngodney1z@discuz.net	Male	+373 219 514 1020	ERnXEnpe0I	ngodney1z	Universitas Indonesia	2020-02-20 00:00:00	2020-02-20 00:00:00
73	Lesly	Anderbrugge	landerbrugge20@51.la	Female	+92 808 349 7334	p2o7AlhEnS	landerbrugge20	Coppin State College	2020-02-20 00:00:00	2020-02-20 00:00:00
74	Bendick	McCloy	bmccloy21@prnewswire.com	Male	+30 391 258 5413	RoU79u9lqaZe	bmccloy21	University of Sussex	2020-02-20 00:00:00	2020-02-20 00:00:00
75	Jan	Vicker	jvicker22@usgs.gov	Female	+62 282 359 3680	wpEdzm	jvicker22	The Union Institute	2020-02-20 00:00:00	2020-02-20 00:00:00
76	Roxanne	Nottingham	rnottingham23@squarespace.com	Female	+7 124 807 1089	jAEbOlxnwBs	rnottingham23	Wuhan Technical University of Surveying and Mapping	2020-02-20 00:00:00	2020-02-20 00:00:00
77	Alanna	Martyns	amartyns24@mediafire.com	Female	+62 584 835 1103	UPrPKb7	amartyns24	Texas A&M University - Texarkana	2020-02-20 00:00:00	2020-02-20 00:00:00
78	Cart	Coleiro	ccoleiro25@ehow.com	Male	+48 246 302 8294	2EO7Hi66j	ccoleiro25	Black Hawk College	2020-02-20 00:00:00	2020-02-20 00:00:00
79	Gustaf	Jovicic	gjovicic26@washington.edu	Male	+33 321 102 1335	CuCVO3u	gjovicic26	Université de Chlef	2020-02-20 00:00:00	2020-02-20 00:00:00
80	Tanya	Cockroft	tcockroft27@wunderground.com	Female	+86 695 638 0974	EHaM5Is8KW	tcockroft27	City University of New York, Medgar Evers College	2020-02-20 00:00:00	2020-02-20 00:00:00
81	Ossie	Sacchetti	osacchetti28@businessweek.com	Male	+55 578 947 7193	HOPLktX1C5J	osacchetti28	Calvin College	2020-02-20 00:00:00	2020-02-20 00:00:00
82	Reyna	Warrack	rwarrack29@mozilla.com	Female	+62 242 769 4384	420gKHCbd	rwarrack29	Escuela de Administración de Negocios	2020-02-20 00:00:00	2020-02-20 00:00:00
83	Mercie	Oldroyde	moldroyde2a@geocities.com	Female	+856 937 626 5849	RkyRgrUoGoCp	moldroyde2a	Moscow University Touro	2020-02-20 00:00:00	2020-02-20 00:00:00
84	Renelle	Lowrie	rlowrie2b@addthis.com	Female	+86 821 193 1551	O9ikFA1o	rlowrie2b	Fujian University of Traditional Chinese Medicine	2020-02-20 00:00:00	2020-02-20 00:00:00
85	Berni	Jobey	bjobey2c@posterous.com	Female	+998 406 270 8087	k1WNe8	bjobey2c	Maharaja Ganga Singh University, Bikaner	2020-02-20 00:00:00	2020-02-20 00:00:00
86	Chadwick	Timothy	ctimothy2d@cmu.edu	Male	+351 906 701 8209	Xi2mpcINabr	ctimothy2d	Shaw University	2020-02-20 00:00:00	2020-02-20 00:00:00
87	Nap	Maffioni	nmaffioni2e@va.gov	Male	+93 623 240 1120	AGZ12Pu	nmaffioni2e	Harran University	2020-02-20 00:00:00	2020-02-20 00:00:00
88	Waylin	Curwood	wcurwood2f@eepurl.com	Male	+62 450 434 0475	TS4ySw	wcurwood2f	Universidade Estadual Paulista	2020-02-20 00:00:00	2020-02-20 00:00:00
89	Jessa	Hotton	jhotton2g@studiopress.com	Female	+351 182 784 3957	B2NCLANC2	jhotton2g	Xi'an Academy of Fine Art	2020-02-20 00:00:00	2020-02-20 00:00:00
90	Almire	Whitten	awhitten2h@unesco.org	Female	+63 234 246 5356	YHbcQHW	awhitten2h	Wilkes University	2020-02-20 00:00:00	2020-02-20 00:00:00
91	Alasdair	Caen	acaen2i@intel.com	Male	+86 224 362 5574	4Rj74wEOTaIh	acaen2i	University of Connecticut at Stamford	2020-02-20 00:00:00	2020-02-20 00:00:00
92	Parsifal	Goathrop	pgoathrop2j@sitemeter.com	Male	+86 858 332 1410	9dXLF7sMU	pgoathrop2j	Tunghai University	2020-02-20 00:00:00	2020-02-20 00:00:00
93	Kimberlyn	Sides	ksides2k@google.co.uk	Female	+47 741 499 9619	W1JxMvQ	ksides2k	Universitas Islam Nusantara	2020-02-20 00:00:00	2020-02-20 00:00:00
94	Freeman	Bruggeman	fbruggeman2l@huffingtonpost.com	Male	+1 746 191 8449	EkBwlJsesubf	fbruggeman2l	China Agricultural University	2020-02-20 00:00:00	2020-02-20 00:00:00
95	Erin	Boutwell	eboutwell2m@newsvine.com	Male	+82 343 603 8025	AWw1dezi	eboutwell2m	Uganda Christian University	2020-02-20 00:00:00	2020-02-20 00:00:00
96	Saxon	Smead	ssmead2n@stumbleupon.com	Male	+48 874 168 5115	dxUsdqzA	ssmead2n	University of Aquila	2020-02-20 00:00:00	2020-02-20 00:00:00
97	Valentino	Landsberg	vlandsberg2o@over-blog.com	Male	+52 504 609 7610	NmEP1TneE	vlandsberg2o	Sindh Agricultural University	2020-02-20 00:00:00	2020-02-20 00:00:00
98	Enrica	Anglish	eanglish2p@hexun.com	Female	+62 788 160 1844	wXzYGsNqJz	eanglish2p	SRM Institute Of Science & Technology ( Deemed University)	2020-02-20 00:00:00	2020-02-20 00:00:00
99	Sibyl	Carlisi	scarlisi2q@go.com	Male	+33 740 715 2530	mbbI5b6CnM0	scarlisi2q	Tsukuba University	2020-02-20 00:00:00	2020-02-20 00:00:00
100	Lurlene	Janousek	ljanousek2r@xrea.com	Female	+20 228 801 0889	MVAG6i	ljanousek2r	Akhbar El Yom Academy	2020-02-20 00:00:00	2020-02-20 00:00:00
101	Haslett	Denison	hdenison2s@is.gd	Male	+992 113 469 9909	Qw65XK	hdenison2s	Akrofi-Christaller Institute of Theeology, Mission and  Culture	2020-02-20 00:00:00	2020-02-20 00:00:00
102	Enos	Chaster	echaster2t@ibm.com	Male	+218 417 436 5035	CVe3pL	echaster2t	Preston Institute of Management Sciences and Technology (PIMSAT)	2020-02-20 00:00:00	2020-02-20 00:00:00
103	Cobb	Gehrtz	cgehrtz2u@who.int	Male	+63 505 677 9633	10cmr7wDj7G8	cgehrtz2u	Omsk State Pedagogical University	2020-02-20 00:00:00	2020-02-20 00:00:00
104	Atalanta	Mohammad	amohammad2v@patch.com	Female	+63 977 706 9227	PCmHm6P	amohammad2v	Angeles University	2020-02-20 00:00:00	2020-02-20 00:00:00
105	Franni	Sydenham	fsydenham2w@msn.com	Female	+235 264 947 6448	dj2hsPx8F	fsydenham2w	Limestone College	2020-02-20 00:00:00	2020-02-20 00:00:00
106	Boonie	Fernao	bfernao2x@reference.com	Male	+62 217 188 0794	DgtD5PFwziL	bfernao2x	Estonian University of Life Sciences	2020-02-20 00:00:00	2020-02-20 00:00:00
107	Arluene	Kersaw	akersaw2y@sciencedirect.com	Female	+503 447 740 4226	etYKN3	akersaw2y	Zayed University	2020-02-20 00:00:00	2020-02-20 00:00:00
108	Vasilis	Masterman	vmasterman2z@t.co	Male	+253 370 834 3018	rNsCSVqfa	vmasterman2z	Solusi University	2020-02-20 00:00:00	2020-02-20 00:00:00
109	Abramo	Thow	athow30@xrea.com	Male	+46 884 387 2857	j9bKKrlWv	athow30	Ecole Supérieure de Commerce de Lille	2020-02-20 00:00:00	2020-02-20 00:00:00
110	Rhonda	Lamberti	rlamberti31@technorati.com	Female	+57 700 775 8359	X5wcSfczPY	rlamberti31	Hong Kong Academy for Performing Arts 	2020-02-20 00:00:00	2020-02-20 00:00:00
111	Marge	Fitzackerley	mfitzackerley32@usatoday.com	Female	+48 723 955 5572	ac6rrUuoEo	mfitzackerley32	Université de la Manouba	2020-02-20 00:00:00	2020-02-20 00:00:00
112	Reggie	O'Corren	rocorren33@mediafire.com	Male	+850 918 632 6970	4MjMQPH	rocorren33	Molloy College	2020-02-20 00:00:00	2020-02-20 00:00:00
113	Arielle	Samper	asamper34@behance.net	Female	+54 721 999 7839	jUD1krB1R79g	asamper34	Hastings College	2020-02-20 00:00:00	2020-02-20 00:00:00
114	Angy	Credland	acredland35@who.int	Female	+86 645 359 2270	gRnFWDs098	acredland35	Escuela Politécnica del Ejercito	2020-02-20 00:00:00	2020-02-20 00:00:00
115	Dav	Glasson	dglasson36@usnews.com	Male	+86 519 276 9255	3hTIKSwkhg	dglasson36	Bluefield State College	2020-02-20 00:00:00	2020-02-20 00:00:00
116	Bibby	Gange	bgange37@theguardian.com	Female	+27 376 648 7059	teN5oQE3uNLc	bgange37	Politeknik Negeri Pontianak	2020-02-20 00:00:00	2020-02-20 00:00:00
117	Patten	Loades	ploades38@sciencedaily.com	Male	+63 641 543 3111	yCh5HwTdC	ploades38	Waseda University	2020-02-20 00:00:00	2020-02-20 00:00:00
118	Jackelyn	Fishpond	jfishpond39@thetimes.co.uk	Female	+86 642 406 1385	hxIP9m	jfishpond39	Knoxville College	2020-02-20 00:00:00	2020-02-20 00:00:00
119	Goober	Glanz	gglanz3a@ucla.edu	Male	+351 528 923 4527	z2tSMCID82XW	gglanz3a	University of Baguio	2020-02-20 00:00:00	2020-02-20 00:00:00
120	Denis	Wigmore	dwigmore3b@si.edu	Male	+7 107 623 6156	cdOiB6afvNAZ	dwigmore3b	Kazan State Pedagogical University	2020-02-20 00:00:00	2020-02-20 00:00:00
\.


--
-- Data for Name: recruiter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recruiter (recruiter_id, company, updated_at, created_at) FROM stdin;
101	Zoomdog	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
102	Realblab	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
103	Jetpulse	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
104	Jabbercube	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
105	Tagfeed	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
106	Quimm	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
107	Divanoodle	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
108	Feedbug	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
109	Realblab	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
110	Thoughtbeat	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
111	Tambee	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
112	Yotz	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
113	Izio	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
114	Thoughtsphere	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
115	Rhycero	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
116	Skinix	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
117	Omba	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
118	Zazio	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
119	Jaloo	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
120	Yakijo	2020-02-20 15:50:41.084231	2020-02-20 00:00:00
\.


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (candidate_id, job_id, owner_id);


--
-- Name: candidate candidate_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_pkey PRIMARY KEY (candidate_id);


--
-- Name: candidate_skill candidate_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate_skill
    ADD CONSTRAINT candidate_skill_pkey PRIMARY KEY (candidate_id, skills);


--
-- Name: job_skill job_skill_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_skill
    ADD CONSTRAINT job_skill_pkey PRIMARY KEY (job_id, owner_id, skills);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (job_id, owner_id);


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
    ADD CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id, owner_id) REFERENCES public.jobs(job_id, owner_id);


--
-- Name: candidate candidate_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate
    ADD CONSTRAINT candidate_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.personal_details(user_id);


--
-- Name: candidate_skill candidate_skill_candidate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.candidate_skill
    ADD CONSTRAINT candidate_skill_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidate(candidate_id);


--
-- Name: job_skill job_skill_job_id_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.job_skill
    ADD CONSTRAINT job_skill_job_id_owner_id_fkey FOREIGN KEY (job_id, owner_id) REFERENCES public.jobs(job_id, owner_id);


--
-- Name: recruiter recruiter_recruiter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recruiter
    ADD CONSTRAINT recruiter_recruiter_id_fkey FOREIGN KEY (recruiter_id) REFERENCES public.personal_details(user_id);


--
-- PostgreSQL database dump complete
--

