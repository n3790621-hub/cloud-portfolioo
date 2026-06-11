# 🚀 Navithra – Cloud & IT Portfolio

> **DecodeLabs Cloud Computing Internship · Project 1 – The Global Launch**  
> Batch: 2026 | B.Tech Information Technology

A fully static, responsive personal portfolio website built with pure **HTML5, CSS3, and Vanilla JavaScript** — deployable to **AWS S3** or **Azure Blob Storage** with zero server provisioning.

---

## 📁 Folder Structure

```
navithra-portfolio/
├── index.html       ← Main HTML (all sections)
├── style.css        ← Design system + responsive styles
├── script.js        ← Interactivity (no frameworks)
└── README.md        ← This file
```

---

## 🌐 Sections

| Section | Description |
|---|---|
| Home | Animated hero with live deployment badge |
| About | Personal introduction + stat pills |
| Education | Timeline: B.Tech · Class XII · Class X |
| Skills | Cloud, DevOps, Web Dev skill bars + tag cloud |
| Projects | 4 projects incl. The Global Launch (featured) |
| Certifications | AWS, Azure, Git credentials |
| Internship | DecodeLabs Cloud Computing experience detail |
| Contact | Contact info + mailto-based form |

---

## ☁️ Deployment – AWS S3 Static Website Hosting

### Prerequisites
- AWS account (free tier sufficient)
- AWS CLI installed: `pip install awscli` → `aws configure`

### Step-by-step

```bash
# 1. Create a bucket (use your desired domain name)
aws s3 mb s3://navithra-portfolio --region ap-south-1

# 2. Enable Static Website Hosting
aws s3 website s3://navithra-portfolio \
  --index-document index.html \
  --error-document index.html

# 3. Set bucket policy for public read access
#    (create policy.json first — see below)
aws s3api put-bucket-policy \
  --bucket navithra-portfolio \
  --policy file://policy.json

# 4. Upload all files
aws s3 sync . s3://navithra-portfolio \
  --exclude ".git/*" \
  --exclude "README.md" \
  --cache-control "max-age=3600"
```

**policy.json** (create in project root, do NOT commit with credentials):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::navithra-portfolio/*"
    }
  ]
}
```

**Live URL format:**  
`http://navithra-portfolio.s3-website.ap-south-1.amazonaws.com`

---

## ☁️ Deployment – Azure Blob Static Website Hosting

### Prerequisites
- Azure account + Azure CLI: `az login`

### Step-by-step

```bash
# 1. Create a Resource Group
az group create --name NavithraPortfolioRG --location centralindia

# 2. Create a Storage Account
az storage account create \
  --name navithraportfolio \
  --resource-group NavithraPortfolioRG \
  --location centralindia \
  --sku Standard_LRS \
  --kind StorageV2

# 3. Enable Static Website
az storage blob service-properties update \
  --account-name navithraportfolio \
  --static-website \
  --index-document index.html \
  --404-document index.html

# 4. Upload files to the $web container
az storage blob upload-batch \
  --account-name navithraportfolio \
  --source . \
  --destination '$web' \
  --pattern "*.html" \
  --overwrite

az storage blob upload-batch \
  --account-name navithraportfolio \
  --source . \
  --destination '$web' \
  --pattern "*.css" \
  --overwrite

az storage blob upload-batch \
  --account-name navithraportfolio \
  --source . \
  --destination '$web' \
  --pattern "*.js" \
  --overwrite
```

**Live URL:**  
`https://navithraportfolio.z29.web.core.windows.net`

---

## 🔐 Security Notes (Principle of Least Privilege)

- **Never use root keys** for deployment. Create a dedicated IAM user (AWS) or service principal (Azure) with only `s3:PutObject` + `s3:GetObject` permissions.
- For AWS: use `aws:PrincipalArn` to restrict administrative access.
- For Azure: use Entra ID (Active Directory) integration and RBAC roles scoped to the storage account.
- Avoid `s3:*` wildcard policies in production — that's the big red stop sign for a reason.

---

## 🛠️ Local Development

No build tools required — just open in a browser:

```bash
# Option 1: VS Code Live Server extension
# Right-click index.html → Open with Live Server

# Option 2: Python HTTP server
python3 -m http.server 3000
# Visit http://localhost:3000

# Option 3: Node http-server
npx http-server . -p 3000
```

---

## 📦 GitHub Upload

```bash
git init
git add .
git commit -m "feat: initial portfolio deployment – DecodeLabs Project 1"
git branch -M main
git remote add origin https://github.com/navithra/navithra-portfolio.git
git push -u origin main
```

> ⚠️ Add `policy.json` to `.gitignore` if it contains your AWS account ID.

---

## ✅ Project 1 Deliverables Checklist

- [x] Publicly accessible URL (after S3/Blob deployment)
- [x] Global low-latency access
- [x] Secured account perimeter (bucket policy + IAM)
- [x] CI/CD ready workflow (sync command idempotent)
- [x] Zero server provisioned
- [x] Cost < $18/month (pay-per-use object storage)

---

## 📞 Contact

| | |
|---|---|
| 📧 Email | navithra2026@gmail.com |
| 🐙 GitHub | github.com/navithra |
| 💼 LinkedIn | linkedin.com/in/navithra |
| 📍 Location | Chennai, Tamil Nadu, India |

---

*Built with 💙 for DecodeLabs Cloud Computing Internship 2026*S