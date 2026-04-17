<?php
/**
 * Template part for displaying the Contact page content
 */
?>

<div class="contact-section">
    <div class="container">
        <h1 class="page-title">Contact</h1>
        
        <div class="contact-content">
            <div class="contact-info">
                <h2>Réservations & Informations</h2>
                <p>Pour toute demande de booking ou information, n'hésitez pas à me contacter :</p>
                
                <ul class="contact-details">
                    <li>
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:contact@davidkrk.com">contact@davidkrk.com</a>
                    </li>
                    <li>
                        <i class="fas fa-phone"></i>
                        <a href="tel:+33600000000">+33 6 00 00 00 00</a>
                    </li>
                </ul>
            </div>

            <div class="contact-form">
                <h2>Formulaire de contact</h2>
                <?php echo do_shortcode('[contact-form-7 id="VOTRE_ID" title="Formulaire de contact"]'); ?>
            </div>

            <div class="social-links">
                <h2>Suivez-moi</h2>
                <div class="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </div>
</div>
