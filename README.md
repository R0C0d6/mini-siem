# Mini SIEM Dashboard

A lightweight Security Information & Event Management (SIEM) project.  
It ingests logs from multiple sources (e.g., SSH, web servers, firewalls), normalizes them, and provides real-time analytics in a dashboard.  
Includes alerting (Slack/Discord/email) for suspicious events like brute-force attacks.

---

## Features
- Python + Flask backend for log ingestion
- SQLite (lightweight) or Elasticsearch for storage
- React dashboard for real-time analytics
- Kibana integration (optional, advanced visualization)
- Alerts via webhooks (Slack, Discord, email)

---

## Installation

### Clone repo
```bash
git clone https://github.com/YOUR_USERNAME/mini-siem.git
cd mini-siem