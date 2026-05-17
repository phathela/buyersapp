import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding RM Hub data...");

  // Create or get business user
  const passwordHash = await bcrypt.hash("password123", 10);
  const business = await prisma.user.upsert({
    where: { email: "business@example.com" },
    update: {},
    create: {
      email: "business@example.com",
      name: "Acme Corp",
      passwordHash,
      userType: "business",
      businessProfile: {
        create: { businessName: "Acme Corp Marketplace", businessType: "marketplace", verified: true },
      },
    },
  });
  console.log(`  ✓ Business user: ${business.email}`);

  // Create employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        businessId: business.id,
        firstName: "Sarah", lastName: "Moyo", email: "sarah@acme.com", phone: "+27 82 111 1111",
        position: "Senior Deal Negotiator", department: "Sales", hireDate: new Date("2024-01-15"), employmentStatus: "active",
      },
    }),
    prisma.employee.create({
      data: {
        businessId: business.id,
        firstName: "Thabo", lastName: "Nkosi", email: "thabo@acme.com", phone: "+27 82 222 2222",
        position: "Deal Negotiator", department: "Sales", hireDate: new Date("2024-03-01"), employmentStatus: "active",
      },
    }),
    prisma.employee.create({
      data: {
        businessId: business.id,
        firstName: "Lindiwe", lastName: "Zulu", email: "lindiwe@acme.com", phone: "+27 82 333 3333",
        position: "Logistics Coordinator", department: "Operations", hireDate: new Date("2024-06-01"), employmentStatus: "probation",
      },
    }),
    prisma.employee.create({
      data: {
        businessId: business.id,
        firstName: "Michael", lastName: "Botha", email: "michael@acme.com", phone: "+27 82 444 4444",
        position: "Customer Success Manager", department: "Support", hireDate: new Date("2023-11-01"), employmentStatus: "active",
      },
    }),
    prisma.employee.create({
      data: {
        businessId: business.id,
        firstName: "Priya", lastName: "Patel", email: "priya@acme.com", phone: "+27 82 555 5555",
        position: "Marketing Specialist", department: "Marketing", hireDate: new Date("2024-09-01"), employmentStatus: "active",
      },
    }),
  ]);
  console.log(`  ✓ ${employees.length} employees created`);

  // Create job postings
  const posting1 = await prisma.jobPosting.create({
    data: {
      businessId: business.id,
      title: "Senior Deal Negotiator",
      description: "We are looking for an experienced negotiator to manage high-value marketplace deals. You will work with top vendors to secure the best pricing for our platform.",
      requirements: "• 5+ years in deal negotiation\n• Proven track record of closing deals\n• Excellent communication skills\n• Experience with CRM tools",
      location: "Sandton, Johannesburg",
      dealCategory: "Services",
      status: "published",
    },
  });
  const posting2 = await prisma.jobPosting.create({
    data: {
      businessId: business.id,
      title: "Logistics Coordinator",
      description: "Coordinate and optimize delivery routes for our growing network of deals and services across the region.",
      requirements: "• 3+ years in logistics\n• Route optimization experience\n• Fleet management knowledge",
      location: "Midrand, Johannesburg",
      dealCategory: "Services",
      status: "published",
    },
  });
  const posting3 = await prisma.jobPosting.create({
    data: {
      businessId: business.id,
      title: "Customer Success Manager",
      description: "Ensure our marketplace buyers and sellers have an exceptional experience.",
      requirements: "• 3+ years in customer success\n• Experience in marketplace platforms\n• Data-driven approach",
      location: "Remote",
      dealCategory: "Technology",
      status: "draft",
    },
  });
  console.log(`  ✓ ${3} job postings created`);

  // Create applications
  await Promise.all([
    prisma.application.create({ data: { jobPostingId: posting1.id, firstName: "Alice", lastName: "M.", email: "alice@example.com", status: "interview", appliedAt: new Date("2026-05-10") } }),
    prisma.application.create({ data: { jobPostingId: posting1.id, firstName: "Bob", lastName: "K.", email: "bob@example.com", status: "screening", appliedAt: new Date("2026-05-12") } }),
    prisma.application.create({ data: { jobPostingId: posting2.id, firstName: "Carol", lastName: "S.", email: "carol@example.com", status: "applied", appliedAt: new Date("2026-05-14") } }),
    prisma.application.create({ data: { jobPostingId: posting2.id, firstName: "David", lastName: "L.", email: "david@example.com", status: "interview", appliedAt: new Date("2026-05-08") } }),
    prisma.application.create({ data: { jobPostingId: posting3.id, firstName: "Eve", lastName: "R.", email: "eve@example.com", status: "applied", appliedAt: new Date("2026-05-15") } }),
  ]);
  console.log(`  ✓ ${5} applications created`);

  // Create time entries
  const today = new Date();
  for (const emp of employees.slice(0, 3)) {
    for (let i = 0; i < 5; i++) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const clockIn = new Date(day.setHours(8, 0, 0));
      const clockOut = new Date(day.setHours(17, 0, 0));
      await prisma.timeEntry.create({
        data: { employeeId: emp.id, clockIn, clockOut },
      });
    }
  }
  // Active clock for Sarah
  await prisma.timeEntry.create({
    data: { employeeId: employees[0].id, clockIn: new Date(), clockOut: null },
  });
  console.log(`  ✓ Time entries created`);

  // Create payroll runs
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  await prisma.payrollRun.create({
    data: {
      businessId: business.id,
      periodStart: lastMonth,
      periodEnd: monthEnd,
      status: "completed",
      totalGross: 85000,
      totalNet: 65000,
    },
  });
  console.log(`  ✓ Payroll runs created`);

  // Create benefits enrollments
  await Promise.all([
    prisma.benefitsEnrollment.create({ data: { employeeId: employees[0].id, benefitType: "health_insurance", startDate: new Date("2024-02-01"), costToEmployer: 5000, costToEmployee: 1200, status: "active" } }),
    prisma.benefitsEnrollment.create({ data: { employeeId: employees[1].id, benefitType: "commission_plan", startDate: new Date("2024-03-01"), costToEmployer: 0, costToEmployee: 0, status: "active" } }),
    prisma.benefitsEnrollment.create({ data: { employeeId: employees[0].id, benefitType: "staff_discount", startDate: new Date("2024-02-01"), costToEmployer: 100, costToEmployee: 0, status: "active" } }),
    prisma.benefitsEnrollment.create({ data: { employeeId: employees[3].id, benefitType: "health_insurance", startDate: new Date("2024-01-01"), costToEmployer: 5000, costToEmployee: 1200, status: "active" } }),
    prisma.benefitsEnrollment.create({ data: { employeeId: employees[2].id, benefitType: "transport", startDate: new Date("2024-06-01"), costToEmployer: 1500, costToEmployee: 500, status: "active" } }),
  ]);
  console.log(`  ✓ Benefits enrollments created`);

  // Create goals with key results
  await Promise.all([
    prisma.goal.create({
      data: {
        employeeId: employees[0].id, title: "Increase deal conversion rate", description: "Improve negotiation-to-close ratio",
        type: "individual", startDate: new Date("2026-01-01"), endDate: new Date("2026-06-30"), status: "active",
        keyResults: [
          { title: "Achieve 85% close rate", target: 85, current: 72 },
          { title: "Reduce avg negotiation time by 20%", target: 20, current: 12 },
        ],
      },
    }),
    prisma.goal.create({
      data: {
        employeeId: employees[1].id, title: "Expand vendor network", description: "Onboard 50 new vendors to the platform",
        type: "individual", startDate: new Date("2026-01-01"), endDate: new Date("2026-12-31"), status: "active",
        keyResults: [
          { title: "Onboard 50 new vendors", target: 50, current: 23 },
          { title: "Reach out to 200 prospects", target: 200, current: 145 },
        ],
      },
    }),
    prisma.goal.create({
      data: {
        employeeId: employees[2].id, title: "Optimize delivery routes", description: "Reduce delivery times by 15%",
        type: "individual", startDate: new Date("2026-03-01"), endDate: new Date("2026-09-01"), status: "active",
      },
    }),
    prisma.goal.create({
      data: {
        employeeId: employees[3].id, title: "Improve CSAT score", description: "Achieve 95% customer satisfaction",
        type: "individual", startDate: new Date("2026-01-01"), endDate: new Date("2026-06-30"), status: "completed",
        keyResults: [{ title: "CSAT score above 95%", target: 95, current: 96 }],
      },
    }),
  ]);
  console.log(`  ✓ Goals created`);

  // Create performance reviews
  await Promise.all([
    prisma.performanceReview.create({
      data: {
        employeeId: employees[0].id, reviewerId: business.id,
        periodStart: new Date("2026-01-01"), periodEnd: new Date("2026-03-31"),
        overallRating: 4, strengths: "Excellent negotiation skills, consistently exceeds targets",
        improvements: "Could improve documentation", status: "completed", submittedAt: new Date(),
      },
    }),
    prisma.performanceReview.create({
      data: {
        employeeId: employees[1].id, reviewerId: business.id,
        periodStart: new Date("2026-01-01"), periodEnd: new Date("2026-03-31"),
        overallRating: 3, strengths: "Good team player, reliable",
        improvements: "Needs to work on closing techniques", status: "completed", submittedAt: new Date(),
      },
    }),
    prisma.performanceReview.create({
      data: {
        employeeId: employees[3].id, reviewerId: business.id,
        periodStart: new Date("2026-01-01"), periodEnd: new Date("2026-03-31"),
        overallRating: 5, strengths: "Outstanding customer feedback, proactive problem solver",
        improvements: "Mentor junior team members", status: "completed", submittedAt: new Date(),
      },
    }),
    prisma.performanceReview.create({
      data: {
        employeeId: employees[2].id, reviewerId: business.id,
        periodStart: new Date("2026-04-01"), periodEnd: new Date("2026-06-30"),
        status: "pending",
      },
    }),
  ]);
  console.log(`  ✓ Performance reviews created`);

  // Create compensation records
  await Promise.all([
    prisma.compensation.create({
      data: { employeeId: employees[0].id, type: "salary", amount: 85000, currency: "USD", effectiveDate: new Date("2024-01-15"), approvalStatus: "approved" },
    }),
    prisma.compensation.create({
      data: { employeeId: employees[1].id, type: "salary", amount: 65000, currency: "USD", effectiveDate: new Date("2024-03-01"), approvalStatus: "approved" },
    }),
    prisma.compensation.create({
      data: { employeeId: employees[2].id, type: "salary", amount: 55000, currency: "USD", effectiveDate: new Date("2024-06-01"), approvalStatus: "pending" },
    }),
    prisma.compensation.create({
      data: { employeeId: employees[3].id, type: "salary", amount: 70000, currency: "USD", effectiveDate: new Date("2023-11-01"), approvalStatus: "approved" },
    }),
    prisma.compensation.create({
      data: { employeeId: employees[4].id, type: "salary", amount: 60000, currency: "USD", effectiveDate: new Date("2024-09-01"), approvalStatus: "approved" },
    }),
    prisma.compensation.create({
      data: { employeeId: employees[0].id, type: "commission", amount: 15000, currency: "USD", effectiveDate: new Date("2026-01-01"), approvalStatus: "approved" },
    }),
  ]);
  console.log(`  ✓ Compensation records created`);

  // Create salary bands
  await Promise.all([
    prisma.salaryBand.create({ data: { businessId: business.id, role: "Deal Negotiator", level: "junior", minSalary: 40000, midSalary: 50000, maxSalary: 60000 } }),
    prisma.salaryBand.create({ data: { businessId: business.id, role: "Deal Negotiator", level: "mid", minSalary: 55000, midSalary: 65000, maxSalary: 75000 } }),
    prisma.salaryBand.create({ data: { businessId: business.id, role: "Deal Negotiator", level: "senior", minSalary: 70000, midSalary: 85000, maxSalary: 100000 } }),
    prisma.salaryBand.create({ data: { businessId: business.id, role: "Logistics Coordinator", level: "mid", minSalary: 45000, midSalary: 55000, maxSalary: 65000 } }),
    prisma.salaryBand.create({ data: { businessId: business.id, role: "Customer Success Manager", level: "mid", minSalary: 55000, midSalary: 70000, maxSalary: 85000 } }),
  ]);
  console.log(`  ✓ Salary bands created`);

  // Create shifts
  for (const emp of employees.slice(0, 2)) {
    for (let i = 0; i < 3; i++) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      await prisma.shift.create({
        data: {
          employeeId: emp.id,
          startTime: new Date(day.setHours(8, 0, 0)),
          endTime: new Date(day.setHours(17, 0, 0)),
          notes: "Regular shift",
        },
      });
    }
  }
  console.log(`  ✓ Shifts created`);

  console.log("\n✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
