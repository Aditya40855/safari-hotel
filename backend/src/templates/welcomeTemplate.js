// src/templates/welcomeTemplate.js
module.exports = (data) => `
  <div style="background-color: #fdfcfb; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
      
      <div style="padding: 40px 40px 20px 40px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #1e293b; letter-spacing: -0.5px;">
          Jawai <span style="color: #ea580c;">Unfiltered</span>
        </h1>
        <div style="width: 40px; hieght: 2px; background-color: #ea580c; margin: 20px auto 0 auto; height: 2px;"></div>
      </div>

      <div style="padding: 0 40px 40px 40px;">
        <h2 style="color: #0f172a; font-size: 22px; margin-top: 30px;">Welcome to the Wild, ${data.name}.</h2>
        <p style="color: #475569; line-height: 1.8; font-size: 16px;">
          We are thrilled to have you with us. Jawai Unfiltered was born from a passion for the raw, untamed beauty of Rajasthan's leopard country. 
        </p>
        <p style="color: #475569; line-height: 1.8; font-size: 16px;">
          By joining us, you now have access to our most exclusive heritage stays and expert-led wildlife expeditions. Whether it's a silent trek through the granite hills or a sunset by the dam, your journey starts here.
        </p>
        
        <div style="margin-top: 35px; text-align: center;">
          <a href="https://jawaiunfiltered.com/safaris" style="background-color: #1e293b; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block;">Explore the Wilderness</a>
        </div>
      </div>

      <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">You received this because you signed up at Jawai Unfiltered.</p>
        <p style="color: #64748b; font-size: 13px; margin-top: 10px; font-weight: 500;">
          Sumerpur, Rajasthan · +91 77425...55
        </p>
      </div>
    </div>
  </div>
`;