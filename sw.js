<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEPP - Hautes Études des Pratiques Pédagogiques (Depuis Mars 2010)</title>
    
    <!-- Configuration PWA -->
    <link rel="manifest" href="./manifest.json">
    <meta name="theme-color" content="#1B365D">
    <link rel="apple-touch-icon" href="./logo-192.png">

    <!-- Police Poppins & Montserrat -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Firebase SDK pour la synchronisation Cloud en temps réel -->
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-database-compat.js"></script>

    <style>
        :root {
            --primary: #1B365D;
            --secondary: #ffc107;
            --dark: #2c3e50;
            --light: #f8f9fa;
            --accent: #28a745;
        }
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f6f9;
            color: #333;
            scroll-behavior: smooth;
        }
        header {
            background-color: var(--primary);
            color: white;
            padding: 12px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .logo-container {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo-img {
            height: 48px;
            width: auto;
            border-radius: 6px;
            background: white;
            padding: 2px;
        }
        .logo-text {
            font-size: 15px;
            font-weight: 700;
            line-height: 1.1;
            font-family: 'Montserrat', sans-serif;
        }
        .logo-subtext {
            font-size: 11px;
            color: var(--secondary);
            font-weight: 400;
        }
        
        /* Menu Moderne Pro (Hamburger / Bouton Menu) */
        .menu-container {
            position: relative;
        }
        .menu-btn {
            background-color: var(--secondary);
            color: var(--primary);
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            transition: 0.2s;
            font-family: 'Poppins', sans-serif;
        }
        .menu-btn:hover {
            background-color: #e0a800;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            top: 45px;
            background-color: white;
            min-width: 240px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-radius: 8px;
            overflow: hidden;
            z-index: 1000;
            border: 1px solid #e1e4e8;
        }
        .dropdown-content a {
            color: var(--primary);
            padding: 12px 18px;
            text-decoration: none;
            display: block;
            font-size: 13.5px;
            font-weight: 500;
            transition: 0.2s;
            cursor: pointer;
            border-bottom: 1px solid #f1f1f1;
        }
        .dropdown-content a:last-child {
            border-bottom: none;
        }
        .dropdown-content a:hover {
            background-color: var(--light);
            color: #d39e00;
            padding-left: 22px;
        }
        .menu-container:hover .dropdown-content {
            display: block;
        }

        .hero {
            background: linear-gradient(rgba(27, 54, 93, 0.9), rgba(27, 54, 93, 0.9)), url('banniere.jpeg');
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            padding: 80px 20px;
        }
        .hero h1 {
            font-size: 34px;
            margin-bottom: 10px;
            font-weight: 700;
            font-family: 'Montserrat', sans-serif;
        }
        .hero .badge-history {
            display: inline-block;
            background: var(--secondary);
            color: var(--primary);
            padding: 4px 15px;
            border-radius: 15px;
            font-weight: 700;
            font-size: 12px;
            margin-bottom: 15px;
        }
        .hero p {
            font-size: 15px;
            max-width: 750px;
            margin: 0 auto 25px auto;
            line-height: 1.6;
            font-weight: 300;
        }
        .btn {
            background-color: var(--secondary);
            color: var(--primary);
            padding: 10px 24px;
            text-decoration: none;
            font-weight: 600;
            border-radius: 6px;
            display: inline-block;
            transition: 0.3s;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            font-size: 14px;
        }
        .btn:hover {
            background-color: #e0a800;
            transform: translateY(-2px);
        }
        .container {
            max-width: 1100px;
            margin: 30px auto;
            padding: 0 20px;
        }
        .section-title {
            text-align: center;
            color: var(--primary);
            font-size: 24px;
            margin-bottom: 30px;
            position: relative;
            font-weight: 600;
            font-family: 'Montserrat', sans-serif;
        }
        .section-title::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background-color: var(--secondary);
            margin: 8px auto 0 auto;
            border-radius: 2px;
        }
        .grid {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .card {
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.04);
            flex: 1;
            min-width: 260px;
            max-width: 480px;
            border-top: 4px solid var(--primary);
        }
        .card h3 {
            color: var(--primary);
            margin-top: 0;
            font-size: 18px;
            font-weight: 600;
        }
        .card p, .card ul {
            line-height: 1.6;
            color: #555;
            font-size: 13.5px;
        }
        .testimonial-grid {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .testimonial-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.04);
            flex: 1;
            min-width: 260px;
            max-width: 340px;
            border-left: 4px solid var(--secondary);
            font-style: italic;
            font-size: 13.5px;
            color: #444;
            line-height: 1.6;
        }
        .testimonial-author {
            margin-top: 12px;
            font-weight: 600;
            font-style: normal;
            color: var(--primary);
            font-size: 12px;
        }
        .accreditation-box {
            background: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.04);
            border: 2px dashed var(--primary);
            margin-top: 30px;
        }
        .panel-section {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.04);
            margin-top: 30px;
            border-top: 4px solid var(--primary);
        }
        .btn-sm {
            background-color: var(--primary);
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            transition: 0.2s;
        }
        .btn-sm:hover {
            background-color: #11223f;
        }
        footer {
            background-color: var(--primary);
            color: white;
            text-align: center;
            padding: 25px 20px;
            margin-top: 50px;
            font-size: 12.5px;
            font-weight: 300;
            line-height: 1.8;
        }
        
        /* Classe pour isoler les sections du site */
        .site-section {
            display: none;
        }
        .site-section.active-section {
            display: block;
        }
    </style>
</head>
<body>

    <!-- Barre de navigation professionnelle -->
    <header>
        <div class="logo-container">
            <img src="logo.jpeg" alt="HEPP Logo" class="logo-img">
            <div>
                <div class="logo-text">HEPP</div>
                <div class="logo-subtext">Fondée en Mars 2010</div>
            </div>
        </div>

        <!-- Bouton Menu Moderne en haut à droite -->
        <div class="menu-container">
            <button class="menu-btn">
                <span>☰ Menu Principal</span> ▾
            </button>
            <div class="dropdown-content">
                <a onclick="basculerSection('accueil')">🏠 Accueil</a>
                <a onclick="basculerSection('apropos')">📚 À Propos & Programmes</a>
                <a onclick="basculerSection('inscription')">📝 Fiche d'Inscription</a>
                <a onclick="basculerSection('espace-etudiant')">🎓 Espace Étudiant</a>
                <a onclick="basculerSection('administration')">⚙️ Administration</a>
                <a onclick="basculerSection('contact')">📞 Contact & Secrétariat</a>
                <a href="https://www.facebook.com/profile.php?id=61586110763106" target="_blank">🌐 Page Facebook Officielle</a>
            </div>
        </div>
    </header>

    <!-- ================= SECTION 1 : ACCUEIL ================= -->
    <div id="sec-accueil" class="site-section active-section">
        <section class="hero">
            <span class="badge-history">🎓 Institution au service de l'éducation depuis Mars 2010</span>
            <h1>Hautes Études des Pratiques Pédagogiques (HEPP)</h1>
            <p>L'excellence académique ancrée en Haïti et ouverte sur le monde. Formations supérieures de pointe en sciences de l'éducation, administration scolaire et gestion de projet.</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a onclick="basculerSection('inscription')" class="btn" style="cursor: pointer;">Accéder à la Fiche d'Inscription</a>
                <a onclick="basculerSection('espace-etudiant')" class="btn" style="background-color: #ffffff; color: var(--primary); cursor: pointer;">Campus Virtuel</a>
            </div>
        </section>

        <div class="container">
            <div style="margin-bottom: 40px;">
                <h2 class="section-title">Nos Offres de Formation</h2>
                <div class="grid">
                    <div class="card">
                        <h3>🏆 Double Diplôme Professionnel (3 mois)</h3>
                        <p>Programme intensif combinant Administration Scolaire et Gestion de Projet pour dirigeants et cadres éducatifs.</p>
                        <a onclick="basculerSection('apropos')" style="color: var(--primary); font-weight: 600; font-size: 13px; cursor: pointer; display: inline-block; margin-top: 10px;">En savoir plus →</a>
                    </div>
                    <div class="card">
                        <h3>🎓 Licence en Sciences de l'Éducation (3 ans)</h3>
                        <p>Cursus supérieur complet pour concevoir, piloter et évaluer des programmes d'enseignement modernes.</p>
                        <a onclick="basculerSection('apropos')" style="color: var(--primary); font-weight: 600; font-size: 13px; cursor: pointer; display: inline-block; margin-top: 10px;">En savoir plus →</a>
                    </div>
                </div>
            </div>

            <div class="accreditation-box">
                <h3 style="color: var(--primary); margin-top: 0; font-weight: 600; font-size: 16px;">🏛️ Cadre Institutionnel</h3>
                <p style="color: #555; max-width: 750px; margin: 0 auto; line-height: 1.6; font-size: 13.5px;">
                    Établie depuis <strong>Mars 2010</strong>, l'institution ''HAUTES ÉTUDES DES PRATIQUES PÉDAGOGIQUES (HEPP)'' respecte scrupuleusement les normes du MENFP, avec l'appui de partenaires académiques internationaux.
                </p>
            </div>
        </div>
    </div>

    <div class="container">

        <!-- ================= SECTION 2 : À PROPOS ET PROGRAMMES ================= -->
        <div id="sec-apropos" class="site-section">
            <div class="panel-section" style="margin-top: 0;">
                <h2 class="section-title">Détails des Cursus Académiques & Séminaires</h2>
                <div class="grid" style="margin-bottom: 30px;">
                    <div class="card">
                        <h3>🏆 Double Diplôme Professionnel (3 mois)</h3>
                        <p>Un programme certifiant intensif conçu pour les professionnels et dirigeants d'établissements.</p>
                    </div>
                    <div class="card">
                        <h3>🎓 Licence en Sciences de l'Éducation (3 ans)</h3>
                        <p>Une formation académique supérieure dispensée sur 3 années.</p>
                    </div>
                </div>
                <div style="margin-top: 40px;">
                    <h3 style="color: var(--primary); text-align: center; margin-bottom: 20px;">🌟 Séminaires & Formations Ponctuelles Disponibles</h3>
                    <div id="listeSeminairesPublic" class="grid">
                        <p style="color: #666; font-style: italic; text-align: center; width: 100%;">Chargement des séminaires disponibles...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= SECTION 3 : FICHE D'INSCRIPTION ================= -->
        <div id="sec-inscription" class="site-section">
            <div class="panel-section" style="margin-top: 0;">
                <h2 class="section-title">Formulaire d'Inscription</h2>
                <form action="https://formspree.io/f/xbgorobg" method="POST" enctype="multipart/form-data" style="max-width: 800px; margin: 0 auto;">
                  <div style="margin-bottom: 18px;">
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; color: var(--primary);">Nom complet et Prénom :</label>
                    <input type="text" name="nom" required style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;">
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 18px;">
                    <input type="email" name="email" placeholder="E-mail" required style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;">
                    <input type="tel" name="telephone" placeholder="Téléphone" required style="padding: 12px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;">
                  </div>
                  <button type="submit" style="width: 100%; padding: 14px; background: var(--primary); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Soumettre mon dossier</button>
                </form>
            </div>
        </div>
       
        <!-- ================= SECTION 4 : ESPACE ÉTUDIANT ================= -->
        <div id="sec-espace-etudiant" class="site-section">
          <div class="panel-section" style="margin-top: 0;">
            <h2 class="section-title">Espace Étudiant</h2>
            
            <div id="etudiantLoginBox" style="max-width: 450px; margin: 20px auto; padding: 30px; background: white; border: 1px solid #ddd; border-radius: 8px;">
              <h3 style="color: #004080; margin-top: 0;">Connexion à votre Campus Virtuel</h3>
              <input type="text" id="etudiantIdInput" placeholder="Matricule ou e-mail" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
              <button onclick="verifierAccesEtudiant()" style="width: 100%; padding: 12px; background: #004080; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Accéder à mon espace</button>
              <p id="erreurLoginEtudiant" style="color: red; margin-top: 12px; display: none;">Identifiant introuvable.</p>
            </div>

            <div id="etudiantDashboard" style="display: none; gap: 20px; margin-top: 20px; flex-direction: column;">
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                  <button onclick="afficherOngletEtudiant('badge')" class="btn-sm">📂 Ma Carte</button>
                  <button onclick="chargerCoursEtudiant()" class="btn-sm" style="background:#f8f9fa; color:#004080; border:1px solid #004080;">📚 Mes Cours</button>
                  <button onclick="afficherOngletEtudiant('finances')" class="btn-sm" style="background:#f8f9fa; color:#004080; border:1px solid #004080;">💰 Finances</button>
                  <button onclick="chargerBibliothequeEtudiant()" class="btn-sm" style="background:#f8f9fa; color:#004080; border:1px solid #004080;">📑 Bibliothèque</button>
                  <button onclick="chargerCertificatsEtudiant()" class="btn-sm" style="background: #28a745;">🎓 Diplômes</button>
                </div>
                <button onclick="deconnexionEtudiant()" style="padding: 8px 14px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer;">Se déconnecter</button>
              </div>
                
              <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #ddd;">
               <!-- ONGLET 1 : CARTE -->
               <div id="onglet-badge" class="etudiant-onglet">
                 <h3 style="color: #1B365D; margin-top: 0; text-align: center;">Carte d'Étudiant Officielle</h3>
                 <div style="max-width: 400px; margin: 0 auto 20px auto; background: #f8f9fa; padding: 12px; border-radius: 8px; text-align: center; border: 1px dashed #1B365D;">
                   <label style="font-size: 13px; font-weight: bold; color: #1B365D; display: block; margin-bottom: 5px;">📷 Importer ou modifier ma photo :</label>
                   <input type="file" id="inputPhotoEtudiant" accept="image/*" onchange="chargerPhotoEtudiant(event)" style="font-size: 12px; width: 100%;">
                 </div>

                 <!-- DESIGN DE LA CARTE -->
                 <div id="badgeImprimable" style="width: 480px; height: 260px; margin: 0 auto 20px auto; background: linear-gradient(145deg, #ffffff, #f8f9fa); border: 3px solid #1B365D; border-radius: 12px; box-shadow: 0 10px 30px rgba(27,54,93,0.25); overflow: hidden; font-family: 'Poppins', Arial, sans-serif; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
                   <div style="background: linear-gradient(135deg, #1B365D, #0f223f); color: white; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #ffc107;">
                     <div style="display: flex; align-items: center; gap: 10px;">
                       <img src="logo.jpeg" alt="Logo HEPP" crossorigin="anonymous" style="height: 28px; width: auto; border-radius: 3px; background: white; padding: 2px;">
                       <div>
                         <div style="font-size: 6.5px; font-weight: 700; text-transform: uppercase; color: #ffc107; font-family: 'Montserrat', sans-serif;">HAUTES ÉTUDES DES PRATIQUES PÉDAGOGIQUES</div>
                         <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #ffffff; font-family: 'Montserrat', sans-serif;">CARTE D'ÉTUDIANT OFFICIELLE</div>
                       </div>
                     </div>
                     <div style="font-size: 8.5px; color: #1B365D; font-weight: 800; background: #ffc107; padding: 2px 8px; border-radius: 4px;">2026-2027</div>
                   </div>

                   <div style="padding: 10px 14px; display: flex; gap: 12px; align-items: center; flex-grow: 1;">
                     <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0;">
                       <div style="width: 72px; height: 92px; border-radius: 6px; border: 2.5px solid #1B365D; overflow: hidden; background: #eee;">
                         <img id="badgePhoto" crossorigin="anonymous" src="https://via.placeholder.com/110" alt="Photo" style="width: 100%; height: 100%; object-fit: cover;">
                       </div>
                       <span style="font-size: 6px; color: #28a745; font-weight: 800; background: #e8f5e9; padding: 1px 4px; border-radius: 3px;">● ADMIS(E)</span>
                     </div>

                     <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1; overflow: hidden;">
                       <h3 id="badgeNom" style="margin: 0 0 5px 0; color: #1B365D; font-size: 11px; font-weight: 700; text-transform: uppercase; text-align: center; background: rgba(27,54,93,0.06); padding: 3px; border-radius: 4px; border-bottom: 2px solid #ffc107;">Nom Prénom</h3>
                       <div style="display: flex; flex-direction: column; gap: 2px; font-size: 7.5px; color: #2c3e50; background: white; padding: 4px; border-radius: 6px; border: 1px solid #e1e4e8;">
                         <div style="display: flex; justify-content: space-between;"><strong style="color: #555;">Matricule :</strong> <span id="badgeMatricule" style="color: #004080; font-weight: 700;">HEPP-000</span></div>
                         <div style="display: flex; justify-content: space-between;"><strong style="color: #555;">Filière :</strong> <span id="badgeFiliere" style="font-weight: 600; font-size: 6.5px;">Filière</span></div>
                         <div style="display: flex; justify-content: space-between;"><strong style="color: #555;">NIF / CIN :</strong> <span id="badgeNifCin">000-000-000-0</span></div>
                         <div style="display: flex; justify-content: space-between;"><strong style="color: #555;">Tél :</strong> <span id="badgeTel">+509 0000-0000</span></div>
                         <div style="display: flex; justify-content: space-between;"><strong style="color: #555;">E-mail :</strong> <span id="badgeEmail">etudiant@hepp.edu</span></div>
                       </div>
                     </div>

                     <div style="text-align: center; flex-shrink: 0; border-left: 2px dashed #dcdcdc; padding-left: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                       <img id="badgeQrImage" src="https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=https://hepp-edu.github.io/site-hepp/" crossorigin="anonymous" alt="QR Code" style="display: block; width: 38px; height: 38px; border-radius: 4px; background: white; padding: 2px;">                       
                       <span style="color: #1B365D; font-weight: 700; font-size: 6px; display: block; margin-top: 2px;">SÉCURISÉ</span>
                     </div>
                   </div>

                   <div style="background: #1B365D; color: #ffc107; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 5.5px; font-weight: 700; border-top: 1px solid #ffc107;">
                     <span>Propriété de HEPP</span>
                     <span>secrétariat.hepp@gmail.com</span>
                     <span>Port-au-Prince, HAÏTI</span>
                   </div>
                 </div>

                 <div style="text-align: center; margin-top: 15px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                   <button onclick="telechargerBadgePNG()" style="padding: 12px 24px; background: #1B365D; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">📥 Télécharger en PNG (HD)</button>
                   <button onclick="telechargerBadgePDF()" style="padding: 12px 24px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">📄 Télécharger en PDF (PVC)</button>
                 </div>
               </div>
                
                <div id="onglet-cours" class="etudiant-onglet" style="display: none;">
                  <h3 style="color: #004080; margin-top: 0;">📚 Mes Dossiers de Cours & Devoirs</h3>
                  <div id="listeCoursDossiersEtudiant" style="display: flex; flex-direction: column; gap: 20px;"></div>
                </div>

                <div id="onglet-finances" class="etudiant-onglet" style="display: none;">
                  <h3 style="color: #004080; margin-top: 0;">Suivi Financier & Scolarité</h3>
                  <div style="background: #f9f9f9; padding: 20px; border-radius: 6px; border: 1px solid #ddd;">
                    <p><strong>Montant Total Versé :</strong> <span id="resVersement" style="color: #28a745; font-weight: bold;">0</span></p>
                    <p><strong>Balance Restante à Payer :</strong> <span id="resBalance" style="color: #dc3545; font-weight: bold;">0</span></p>
                  </div>
                </div>

                <div id="onglet-bibliotheque" class="etudiant-onglet" style="display: none;">
                  <h3 style="color: #004080; margin-top: 0;">Bibliothèque Numérique</h3>
                  <div id="listeDocumentsBibliotheque" style="display: grid; grid-template-columns: 1fr; gap: 15px;"></div>
                </div>

                <div id="onglet-certificats" class="etudiant-onglet" style="display: none;">
                  <h3 style="color: #004080; margin-top: 0;">🎓 Mes Diplômes et Certificats</h3>
                  <div id="listeCertificatsEtudiant" style="display: grid; grid-template-columns: 1fr; gap: 15px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= SECTION 5 : VÉRIFICATEUR OFFICIEL (QR CODE) ================= -->
        <div id="sec-verifier" class="site-section">
            <div class="panel-section" style="max-width: 600px; margin: 0 auto; text-align: center;">
                <h2 class="section-title">Vérification Officielle du Statut Étudiant</h2>
                <div id="resultatVerification" style="padding: 20px; border-radius: 8px; background: #f8f9fa; border: 2px solid #1B365D; text-align: left;">
                    <p style="text-align: center; color: #666; font-style: italic;">Recherche des informations de l'étudiant dans le registre sécurisé...</p>
                </div>
            </div>
        </div>

        <!-- ================= SECTION 6 : ADMINISTRATION ================= -->
        <div id="sec-administration" class="site-section">
          <div class="panel-section" style="margin-top: 0;">
            <h2 class="section-title">Portail Administratif</h2>

            <div id="adminLoginBox" style="max-width: 400px; margin: 20px auto; padding: 20px; background: white; border: 1px solid #ddd; border-radius: 6px;">
              <h3>Connexion Administrateur</h3>
              <input type="password" id="adminPasswordInput" placeholder="Mot de passe admin" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
              <button onclick="verifierAdmin()" style="width: 100%; padding: 10px; background: #004080; color: white; border: none; border-radius: 4px; cursor: pointer;">Se connecter</button>
              <p id="erreurLogin" style="color: red; margin-top: 10px; display: none;">Mot de passe incorrect.</p>
            </div>

            <div id="adminDashboard" style="display: none;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #28a745;">Bienvenue, Administrateur (Mode Cloud Synchro)</h3>
                <button onclick="deconnexionAdmin()" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Se déconnecter</button>
              </div>

              <!-- Enregistrement Étudiant -->
              <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 20px;">
                <h4 style="color: #004080;">Registre Officiel des Étudiants Admis</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="text" id="adminNom" placeholder="Nom complet" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <input type="text" id="adminCode" placeholder="Matricule (ex: hepp-2026-001)" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="email" id="adminEmail" placeholder="Adresse e-mail" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <input type="text" id="adminTel" placeholder="Téléphone" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="text" id="adminNifCin" placeholder="NIF / CIN" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <select id="adminFiliere" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: white;">
                    <option value="Double Diplôme Admin & Gestion">Double Diplôme Admin & Gestion</option>
                    <option value="Licence en Sciences de l'Éducation">Licence en Sciences de l'Éducation</option>
                    <option value="Séminaire / Formation Ponctuelle">Séminaire / Formation Ponctuelle</option>
                  </select>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="number" id="adminVersement" placeholder="Montant versé" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <input type="number" id="adminBalance" placeholder="Balance restante" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <select id="adminEtatEtude" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; background: white;">
                    <option value="En cours">Études En cours</option>
                    <option value="Achevé">Études Achevé(es)</option>
                  </select>
                </div>
                <button onclick="ajouterEtudiantComplet()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Enregistrer dans le Cloud</button>
              </div>

              <!-- Tableau récapitulatif -->
              <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #ddd; overflow-x: auto; margin-bottom: 20px;">
                <h4>Étudiants Admis & Ajustement Financier (<span id="totalEtudiantsCount">0</span>)</h4>
                <table style="width: 100%; margin-top: 10px; border-collapse: collapse; font-size: 13.5px;">
                  <thead>
                    <tr style="background: #f1f1f1; text-align: left;">
                      <th style="padding: 8px; border: 1px solid #ddd;">Matricule / Nom</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Contact</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">Finances (Versé / Reste)</th>
                      <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="listeEtudiantsCompletTable"></tbody>
                </table>
              </div>

              <!-- GESTION SÉMINAIRES & COURS & BIBLIOTHÈQUE (Intégré) -->
              <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #ddd; margin-bottom: 20px;">
                <h4 style="color: #e67e22;">🌟 Gestion des Séminaires</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                  <input type="text" id="adminTitreSeminaire" placeholder="Intitulé" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                  <input type="text" id="adminDateSeminaire" placeholder="Date / Durée" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
                </div>
                <textarea id="adminDescSeminaire" placeholder="Description..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; height: 50px; box-sizing: border-box; margin-bottom: 10px;"></textarea>
                <button onclick="creerSeminaire()" style="padding: 8px 15px; background: #e67e22; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Publier le séminaire</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= SECTION 7 : CONTACT ================= -->
        <div id="sec-contact" class="site-section">
            <div class="panel-section" style="margin-top: 0;">
                <h2 class="section-title">Secrétariat Académique</h2>
                <div style="text-align: center; font-size: 14px; color: #555;">
                    <p>📍 <strong>Adresse :</strong> Port-au-Prince, Haïti</p>
                    <p>📧 <strong>E-mail :</strong> secrétariat.hepp@gmail.com</p>
                    <p>📞 <strong>Téléphones :</strong> (+509) 4647-5772 / 4486-6248</p>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p><strong>Hautes Études des Pédagogiques (HEPP)</strong> — Fondée en Mars 2010</p>
        <p>© 2026 HEPP. Tous droits réservés.</p>
    </footer>

    <!-- Scripts JavaScript -->
    <script>
        const firebaseConfig = {
            databaseURL: "https://hepp-campus-default-rtdb.firebaseio.com/"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.database();

        const MOT_DE_PASSE_ADMIN = "HeppAdmin#2026$Secure!";
        let etudiantConnecte = null;

        function basculerSection(nomSection) {
            const sections = document.querySelectorAll(".site-section");
            sections.forEach(sec => sec.classList.remove("active-section"));
            
            const cible = document.getElementById("sec-" + nomSection);
            if (cible) {
                cible.classList.add("active-section");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (nomSection === 'apropos') {
                chargerSeminairesPublic();
            }
        }

        // --- VÉRIFICATEUR PAR QR CODE ---
        function verifierEtudiantParUrl() {
            const hash = window.location.hash; // Ex: #verifier?matricule=HEPP-2026-001
            if (hash.includes("verifier")) {
                basculerSection("verifier");
                const urlParams = new URLSearchParams(hash.split('?')[1]);
                const matricule = urlParams.get("matricule");

                const conteneur = document.getElementById("resultatVerification");
                if (!matricule) {
                    conteneur.innerHTML = `<p style="color: red; text-align: center; font-weight: bold;">Matricule manquant dans le lien de vérification.</p>`;
                    return;
                }

                db.ref("hepp_etudiants_admis").once('value', (snapshot) => {
                    const data = snapshot.val() || {};
                    let etudiants = Object.values(data);
                    let etudiantTrouve = etudiants.find(e => e.code && e.code.toLowerCase() === matricule.toLowerCase());

                    if (etudiantTrouve) {
                        let balanceRestante = parseFloat(etudiantTrouve.balance) || 0;
                        let enRegle = balanceRestante <= 0;
                        let etatEtude = etudiantTrouve.etatEtude || "En cours";

                        conteneur.innerHTML = `
                            <div style="text-align: center; margin-bottom: 15px;">
                                <img src="${etudiantTrouve.photoUrl || 'https://via.placeholder.com/110'}" style="width: 90px; height: 110px; object-fit: cover; border-radius: 6px; border: 3px solid #1B365D;" alt="Photo">
                                <h3 style="color: #1B365D; margin: 10px 0 5px 0; text-transform: uppercase;">${etudiantTrouve.nom}</h3>
                                <p style="color: #004080; font-weight: bold; margin: 0;">Matricule : ${etudiantTrouve.code}</p>
                            </div>
                            <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                            <p style="font-size: 14px; margin: 8px 0;"><strong>📚 Filière :</strong> ${etudiantTrouve.filiere}</p>
                            <p style="font-size: 14px; margin: 8px 0;"><strong>🏛️ Statut dans l'établissement :</strong> <span style="color: #28a745; font-weight: bold;">● Étudiant(e) Officiel(le) Admis(e)</span></p>
                            <p style="font-size: 14px; margin: 8px 0;"><strong>💰 Situation financière :</strong> <span style="color: ${enRegle ? '#28a745' : '#dc3545'}; font-weight: bold;">${enRegle ? 'En règle (Solde soldé)' : 'Solde en cours (Reste à payer)'}</span></p>
                            <p style="font-size: 14px; margin: 8px 0;"><strong>🎓 État des études :</strong> <span style="color: #1B365D; font-weight: bold;">${etatEtude}</span></p>
                            <div style="margin-top: 20px; background: #e8f5e9; padding: 10px; border-radius: 6px; text-align: center; border: 1px solid #c8e6c9;">
                                <span style="color: #2e7d32; font-size: 13px; font-weight: bold;">✔ Certifié authentique par le Secrétariat des HEPP</span>
                            </div>
                        `;
                    } else {
                        conteneur.innerHTML = `<p style="color: red; text-align: center; font-weight: bold;">Aucun dossier actif trouvé pour le matricule : ${matricule}</p>`;
                    }
                });
            }
        }

        window.addEventListener('load', verifierEtudiantParUrl);
        window.addEventListener('hashchange', verifierEtudiantParUrl);

        // --- CHARGEMENT DES SÉMINAIRES CÔTÉ PUBLIC ---
        function chargerSeminairesPublic() {
            const conteneur = document.getElementById("listeSeminairesPublic");
            if (!conteneur) return;
            db.ref("hepp_seminaires").once('value', (snapshot) => {
                const data = snapshot.val() || {};
                let seminaires = Object.values(data);
                conteneur.innerHTML = "";
                if (seminaires.length === 0) {
                    conteneur.innerHTML = `<p style="color: #666; font-style: italic; text-align: center; width: 100%;">Aucun séminaire disponible.</p>`;
                    return;
                }
                seminaires.forEach(sem => {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.style.borderTop = "4px solid #e67e22";
                    card.innerHTML = `
                        <h3 style="color: #e67e22;">🌟 ${sem.titre}</h3>
                        <p style="font-weight: bold; font-size: 13px;">📅 Date / Durée : ${sem.date}</p>
                        <p>${sem.description}</p>
                        <a onclick="basculerSection('inscription')" class="btn" style="background-color: #e67e22; color: white; margin-top: 10px; cursor: pointer;">S'inscrire</a>
                    `;
                    conteneur.appendChild(card);
                });
            });
        }

        // --- TÉLÉCHARGEMENT DIRECT EN PNG ---
        function telechargerBadgePNG() {
            const nom = document.getElementById("badgeNom").innerText || "Etudiant";
            const matricule = document.getElementById("badgeMatricule").innerText || "HEPP";
            const filiere = document.getElementById("badgeFiliere").innerText || "";
            const nifCin = document.getElementById("badgeNifCin").innerText || "";
            const tel = document.getElementById("badgeTel").innerText || "";
            const email = document.getElementById("badgeEmail").innerText || "";
            const photoSrc = document.getElementById("badgePhoto").src || "https://via.placeholder.com/110";
            const logoSrc = "logo.jpeg";
            const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=` + encodeURIComponent("https://hepp-edu.github.io/site-hepp/#verifier?matricule=" + matricule);

            const canvas = document.createElement("canvas");
            canvas.width = 960;
            canvas.height = 520;
            const ctx = canvas.getContext("2d");

            function chargerImage(url) {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = url;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        const fallback = new Image();
                        fallback.src = "https://via.placeholder.com/120";
                        fallback.onload = () => resolve(fallback);
                    };
                });
            }

            Promise.all([chargerImage(logoSrc), chargerImage(photoSrc), chargerImage(qrSrc)]).then(([imgLogo, imgPhoto, imgQR]) => {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.strokeStyle = "#1B365D";
                ctx.lineWidth = 8;
                ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

                ctx.fillStyle = "#1B365D";
                ctx.fillRect(8, 8, canvas.width - 16, 90);
                ctx.fillStyle = "#ffc107";
                ctx.fillRect(8, 94, canvas.width - 16, 8);

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(20, 20, 75, 75);
                ctx.drawImage(imgLogo, 22, 22, 71, 71);

                ctx.fillStyle = "#ffc107";
                ctx.font = "bold 15px Montserrat, Arial, sans-serif";
                ctx.fillText("HAUTES ÉTUDES DES PRATIQUES PÉDAGOGIQUES", 115, 40);

                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 26px Montserrat, Arial, sans-serif";
                ctx.fillText("CARTE D'ÉTUDIANT OFFICIELLE", 115, 75);

                ctx.fillStyle = "#ffc107";
                ctx.fillRect(790, 30, 135, 45);
                ctx.fillStyle = "#1B365D";
                ctx.font = "bold 20px Poppins, Arial, sans-serif";
                ctx.fillText("2026-2027", 805, 60);

                ctx.strokeStyle = "#1B365D";
                ctx.lineWidth = 6;
                ctx.strokeRect(30, 130, 160, 200);
                ctx.drawImage(imgPhoto, 33, 133, 154, 194);

                ctx.fillStyle = "#e8f5e9";
                ctx.fillRect(55, 345, 110, 30);
                ctx.fillStyle = "#28a745";
                ctx.font = "bold 14px Poppins, Arial, sans-serif";
                ctx.fillText("● ADMIS(E)", 68, 366);

                ctx.fillStyle = "#1B365D";
                ctx.font = "bold 22px Montserrat, Arial, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(nom.toUpperCase(), 530, 150);
                ctx.textAlign = "left";

                ctx.fillStyle = "#f8f9fa";
                ctx.fillRect(220, 175, 480, 180);
                ctx.strokeStyle = "#e1e4e8";
                ctx.lineWidth = 2;
                ctx.strokeRect(220, 175, 480, 180);

                ctx.font = "bold 16px Poppins, Arial, sans-serif";
                let yPos = 205;
                const lignes = [
                    { label: "Matricule :", val: matricule },
                    { label: "Filière :", val: filiere },
                    { label: "NIF / CIN :", val: nifCin },
                    { label: "Tél :", val: tel },
                    { label: "E-mail :", val: email }
                ];

                lignes.forEach(ligne => {
                    ctx.fillStyle = "#555555";
                    ctx.fillText(ligne.label, 240, yPos);
                    ctx.fillStyle = "#004080";
                    ctx.fillText(ligne.val, 360, yPos);
                    yPos += 30;
                });

                ctx.drawImage(imgQR, 730, 205, 120, 120);
                ctx.fillStyle = "#1B365D";
                ctx.font = "bold 14px Poppins, Arial, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("SÉCURISÉ", 790, 345);
                ctx.textAlign = "left";

                ctx.fillStyle = "#1B365D";
                ctx.fillRect(8, 455, canvas.width - 16, 55);
                ctx.fillStyle = "#ffc107";
                ctx.font = "bold 12px Poppins, Arial, sans-serif";
                ctx.fillText("Propriété de HEPP", 30, 490);
                ctx.fillText("secrétariat.hepp@gmail.com", 360, 490);
                ctx.fillText("Port-au-Prince, HAÏTI", 730, 490);

                const imageURL = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = imageURL;
                link.download = `Carte_Etudiant_${matricule}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }

        // --- TÉLÉCHARGEMENT EN PDF ---
        function telechargerBadgePDF() {
            const matricule = document.getElementById("badgeMatricule").innerText || "HEPP";
            const qrImgElement = document.getElementById("badgeQrImage");
            if (qrImgElement) {
                qrImgElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=` + encodeURIComponent("https://hepp-edu.github.io/site-hepp/#verifier?matricule=" + matricule);
            }

            setTimeout(() => {
                const contenuBadge = document.getElementById("badgeImprimable").outerHTML;
                const fenetreImpression = window.open('', '', 'height=700,width=600');
                
                fenetreImpression.document.write('<html><head><title>Carte_Etudiant_HEPP_' + matricule + '</title>');
                fenetreImpression.document.write('<style>');
                fenetreImpression.document.write('@page { size: 90mm 80mm; margin: 0; }');
                fenetreImpression.document.write('body { font-family: Poppins, Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: hidden; }');
                fenetreImpression.document.write('#badgeImprimable { box-shadow: none !important; border: 3px solid #1B365D !important; width: 480px !important; height: 260px !important; page-break-inside: avoid; }');
                fenetreImpression.document.write('</style>');
                fenetreImpression.document.write('</head><body>');
                fenetreImpression.document.write(contenuBadge);
                fenetreImpression.document.write('</body></html>');
                
                fenetreImpression.document.close();
                fenetreImpression.focus();
                
                setTimeout(() => {
                    fenetreImpression.print();
                    fenetreImpression.close();
                }, 600);
            }, 400);
        }

        // --- ADMINISTRATION ---
        function verifierAdmin() {
            const saisie = document.getElementById("adminPasswordInput").value.trim();
            if (saisie === MOT_DE_PASSE_ADMIN) {
                document.getElementById("adminLoginBox").style.display = "none";
                document.getElementById("adminDashboard").style.display = "block";
                document.getElementById("erreurLogin").style.display = "none";
                chargerEtudiantsComplet();
            } else {
                document.getElementById("erreurLogin").style.display = "block";
            }
        }

        function deconnexionAdmin() {
            document.getElementById("adminDashboard").style.display = "none";
            document.getElementById("adminLoginBox").style.display = "block";
            document.getElementById("adminPasswordInput").value = "";
        }

        // --- ESPACE ÉTUDIANT ---
        function verifierAccesEtudiant() {
            const saisie = document.getElementById("etudiantIdInput").value.trim().toLowerCase();
            db.ref("hepp_etudiants_admis").once('value', (snapshot) => {
                const data = snapshot.val() || {};
                let etudiants = Object.values(data);
                etudiantConnecte = etudiants.find(e => 
                    (e.email && e.email.toLowerCase() === saisie) || 
                    (e.code && e.code.toLowerCase() === saisie)
                );

                if (etudiantConnecte) {
                    document.getElementById("etudiantLoginBox").style.display = "none";
                    document.getElementById("etudiantDashboard").style.display = "flex";
                    chargerDonneesBadgeEtudiant();
                    afficherOngletEtudiant('badge');
                } else {
                    document.getElementById("erreurLoginEtudiant").style.display = "block";
                }
            });
        }

        function chargerDonneesBadgeEtudiant() {
            if (!etudiantConnecte) return;
            document.getElementById("badgeNom").innerText = etudiantConnecte.nom || "Nom Inconnu";
            document.getElementById("badgeMatricule").innerText = etudiantConnecte.code || "HEPP-000";
            document.getElementById("badgeFiliere").innerText = etudiantConnecte.filiere || "Filière Générale";
            document.getElementById("badgeNifCin").innerText = etudiantConnecte.nifCin || "N/A";
            document.getElementById("badgeTel").innerText = etudiantConnecte.tel || "+509 0000-0000";
            document.getElementById("badgeEmail").innerText = etudiantConnecte.email || "etudiant@hepp.edu";
            
            document.getElementById("badgePhoto").src = etudiantConnecte.photoUrl || "https://via.placeholder.com/110";
            document.getElementById("resVersement").innerText = (etudiantConnecte.versement || "0") + " HTG / $";
            document.getElementById("resBalance").innerText = (etudiantConnecte.balance || "0") + " HTG / $";

            // Mettre à jour dynamiquement le QR Code de la carte avec le lien de vérification individuel
            const qrImg = document.getElementById("badgeQrImage");
            if (qrImg) {
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=` + encodeURIComponent("https://hepp-edu.github.io/site-hepp/#verifier?matricule=" + etudiantConnecte.code);
            }
        }

        function chargerPhotoEtudiant(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const photoBase64 = e.target.result;
                    document.getElementById("badgePhoto").src = photoBase64;
                    if (etudiantConnecte) {
                        etudiantConnecte.photoUrl = photoBase64;
                        db.ref("hepp_etudiants_admis").once('value', (snapshot) => {
                            const data = snapshot.val() || {};
                            for (let key in data) {
                                if (data[key].code === etudiantConnecte.code) {
                                    db.ref("hepp_etudiants_admis/" + key).update({ photoUrl: photoBase64 });
                                    break;
                                }
                            }
                            alert("Photo enregistrée !");
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
        }

        function afficherOngletEtudiant(nomOnglet) {
            const onglets = document.querySelectorAll(".etudiant-onglet");
            onglets.forEach(o => o.style.display = "none");
            const cible = document.getElementById("onglet-" + nomOnglet);
            if (cible) cible.style.display = "block";
        }

        function deconnexionEtudiant() {
            etudiantConnecte = null;
            document.getElementById("etudiantDashboard").style.display = "none";
            document.getElementById("etudiantLoginBox").style.display = "block";
            document.getElementById("etudiantIdInput").value = "";
        }

        // --- GESTION DES ÉTUDIANTS (ADMIN) ---
        let etiquetteCleModificationCourante = null;

        function ajouterEtudiantComplet() {
            const nom = document.getElementById("adminNom").value;
            const code = document.getElementById("adminCode").value;
            const email = document.getElementById("adminEmail").value;
            const tel = document.getElementById("adminTel").value;
            const nifCin = document.getElementById("adminNifCin").value;
            const filiere = document.getElementById("adminFiliere").value;
            const versement = document.getElementById("adminVersement").value;
            const balance = document.getElementById("adminBalance").value;
            const etatEtude = document.getElementById("adminEtatEtude").value;

            if (!nom || !email || !code) {
                alert("Veuillez remplir au moins le nom, le code et l'e-mail.");
                return;
            }

            if (etiquetteCleModificationCourante) {
                db.ref("hepp_etudiants_admis/" + etiquetteCleModificationCourante).once('value', (snapshot) => {
                    let anciennePhoto = snapshot.val() ? snapshot.val().photoUrl || "" : "";
                    const etudiantModifie = { nom, code, email, tel, nifCin, filiere, versement: versement || "0", balance: balance || "0", etatEtude: etatEtude || "En cours", photoUrl: anciennePhoto };
                    
                    db.ref("hepp_etudiants_admis/" + etiquetteCleModificationCourante).set(etudiantModifie, () => {
                        nettoyerFormulaireEtudiant();
                        chargerEtudiantsComplet();
                        alert("Informations mises à jour avec succès !");
                    });
                });
            } else {
                const nouvelEtudiant = { nom, code, email, tel, nifCin, filiere, versement: versement || "0", balance: balance || "0", etatEtude: etatEtude || "En cours", photoUrl: "" };
                db.ref("hepp_etudiants_admis").push(nouvelEtudiant, () => {
                    nettoyerFormulaireEtudiant();
                    chargerEtudiantsComplet();
                    alert("Étudiant enregistré !");
                });
            }
        }

        function nettoyerFormulaireEtudiant() {
            document.getElementById("adminNom").value = "";
            document.getElementById("adminCode").value = "";
            document.getElementById("adminEmail").value = "";
            document.getElementById("adminTel").value = "";
            document.getElementById("adminNifCin").value = "";
            document.getElementById("adminVersement").value = "";
            document.getElementById("adminBalance").value = "";
            etiquetteCleModificationCourante = null;
        }

        function chargerEtudiantsComplet() {
            const tbody = document.getElementById("listeEtudiantsCompletTable");
            const countEl = document.getElementById("totalEtudiantsCount");
            if (!tbody) return;

            db.ref("hepp_etudiants_admis").on('value', (snapshot) => {
                const data = snapshot.val() || {};
                tbody.innerHTML = "";
                let keys = Object.keys(data);
                if (countEl) countEl.innerText = keys.length;

                if (keys.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" style="padding: 12px; text-align: center; color: #666; font-style: italic;">Aucun étudiant enregistré.</td></tr>`;
                    return;
                }

                keys.forEach(key => {
                    let et = data[key];
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>${et.code}</strong><br>${et.nom}<br><small style="color:#666;">État : ${et.etatEtude || 'En cours'}</small></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${et.email}<br>${et.tel || ''}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">
                          Versé: <input type="text" id="versement_${key}" value="${et.versement || 0}" style="width:60px; padding:3px;"><br>
                          Reste: <input type="text" id="balance_${key}" value="${et.balance || 0}" style="width:60px; padding:3px; color:red;">
                        </td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                            <button onclick="mettreAJourFinances('${key}')" style="padding: 4px 8px; background: #004080; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; margin-bottom: 2px;">MàJ Finances</button><br>
                            <button onclick="preparerModificationEtudiant('${key}', '${encodeURIComponent(JSON.stringify(et))}')" style="padding: 4px 8px; background: #e67e22; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; margin-bottom: 2px;">Modifier</button><br>
                            <button onclick="supprimerEtudiant('${key}')" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">Retirer</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            });
        }

        function mettreAJourFinances(key) {
            const nouveauVersement = document.getElementById(`versement_${key}`).value;
            const nouvelleBalance = document.getElementById(`balance_${key}`).value;
            db.ref("hepp_etudiants_admis/" + key).update({
                versement: nouveauVersement,
                balance: nouvelleBalance
            }, () => {
                alert("Dossier financier mis à jour !");
            });
        }

        function preparerModificationEtudiant(key, etudiantJsonStr) {
            const et = JSON.parse(decodeURIComponent(etudiantJsonStr));
            document.getElementById("adminNom").value = et.nom || "";
            document.getElementById("adminCode").value = et.code || "";
            document.getElementById("adminEmail").value = et.email || "";
            document.getElementById("adminTel").value = et.tel || "";
            document.getElementById("adminNifCin").value = et.nifCin || "";
            document.getElementById("adminFiliere").value = et.filiere || "Double Diplôme Admin & Gestion";
            document.getElementById("adminVersement").value = et.versement || "";
            document.getElementById("adminBalance").value = et.balance || "";
            document.getElementById("adminEtatEtude").value = et.etatEtude || "En cours";

            etiquetteCleModificationCourante = key;
            window.scrollTo({ top: document.getElementById("adminNom").offsetTop - 100, behavior: 'smooth' });
        }

        function supprimerEtudiant(key) {
            if (confirm("Voulez-vous retirer cet étudiant ?")) {
                db.ref("hepp_etudiants_admis/" + key).remove(() => {
                    alert("Étudiant retiré.");
                });
            }
        }

        function creerSeminaire() {
            const titre = document.getElementById("adminTitreSeminaire").value.trim();
            const date = document.getElementById("adminDateSeminaire").value.trim();
            const description = document.getElementById("adminDescSeminaire").value.trim();
            if (!titre || !date) return alert("Remplissez le titre et la date.");
            db.ref("hepp_seminaires").push({ titre, date, description }, () => {
                document.getElementById("adminTitreSeminaire").value = "";
                document.getElementById("adminDateSeminaire").value = "";
                document.getElementById("adminDescSeminaire").value = "";
                alert("Séminaire publié !");
            });
        }
    </script>
</body>
</html>

