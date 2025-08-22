import nodemailer from 'nodemailer';


const validateInput = (data) => {
  const { firstName, lastName, email, subject, message } = data;

  if (!firstName || firstName.trim().length < 2) {
    return { error: 'First name must be at least 2 characters long' };
  }

  if (!lastName || lastName.trim().length < 3) {
    return { error: 'Last name must be at least 3 characters long' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { error: 'Please provide a valid email address' };
  }

  if (!subject || subject.trim().length < 3) {
    return { error: 'Subject must be at least 3 characters long' };
  }

  if (!message || message.trim().length < 3) {
    return { error: 'Message must be at least 3 characters long' };
  }

  // Return validated data instead of setting req.validatedData
  return {
    validatedData: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    }
  };
};

// Your transporter stays exactly the same
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Convert your router.post('/contact', ...) to export async function POST
export async function POST(request) {
  console.log('=== DEBUGGING ENV VARS ===');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
  console.log('EMAIL_PASS length:', process.env.EMAIL_PASS?.length);
  console.log('All env keys:', Object.keys(process.env).filter(key => key.includes('EMAIL')));
  console.log('========================');

  try {
   
    const body = await request.json();
    const validation = validateInput(body);

    if (validation.error) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const { firstName, lastName, email, subject, message } = validation.validatedData;


    console.log('Received firstName:', firstName);
    console.log('Received LAST name:', lastName);


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email
    };


    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: `Hello ${firstName}! ${lastName}, I'm glad you sent me your email: ${email} and told me ${subject} is from ${message}`,
      data: validation.validatedData
    });

  } catch (error) {
    console.error('Email problem:', error);
    // Return error response (replaces res.status(500).json(...))
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}