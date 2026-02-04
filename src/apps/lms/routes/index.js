import { Router } from "express";
import institutionRoutes from "./institution.routes.js";
import institutionSetupRoutes from "./institutionSetup.routes.js";
import studentRoutes from "./student.routes.js";
import teacherRoutes from "./teacher.routes.js";
import coursesRoutes from "./courses.routes.js";
import subjectsRoutes from "./subjects.routes.js";
import branchRoutes from "./branch.routes.js";
import enrolledCoursesRoutes from "./enrolledCourses.routes.js";
import assignmentRoutes from "./assignment.routes.js";
import notesRoutes from "./notes.routes.js";
import videoRoutes from "./video.routes.js";
import quizzRoutes from "./quizz.routes.js";
import resultRoutes from "./result.routes.js";
import announcementRoutes from "./announcement.routes.js";
import eventRoutes from "./event.routes.js";
import commentRoutes from "./comment.routes.js";
import likeRoutes from "./like.routes.js";
import feesRoutes from "./fees.routes.js";
import adminRoutes from "./admin.routes.js";
import examRoutes from "./exam.routes.js";
import academicRecordRoutes from "./academicRecord.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import libraryRoutes from "./library.routes.js";
import transportRoutes from "./transport.routes.js";
import scholarshipRoutes from "./scholarship.routes.js";
import payrollRoutes from "./payroll.routes.js";
import specializationRoutes from "./specialization.routes.js";
import sectionRoutes from "./section.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import timetableRoutes from "./timetable.routes.js";
import settingsRoutes from "./settings.routes.js";
import timetableSettingsRoutes from "./timetableSettings.routes.js";
import attendanceRuleRoutes from "./attendanceRule.routes.js";
import hostelRoutes from "./hostel.routes.js";
import visitorRoutes from "./visitor.routes.js";
import leaveRoutes from "./leave.routes.js";

const router = Router();

// Core
router.use("/institution", institutionRoutes);
router.use("/institution-setup", institutionSetupRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);
router.use("/specialization", specializationRoutes);

// Academic
router.use("/courses", coursesRoutes);
router.use("/subjects", subjectsRoutes);
router.use("/branch", branchRoutes);
router.use("/enrolled-courses", enrolledCoursesRoutes);

// Content & Assessment
router.use("/assignment", assignmentRoutes);
router.use("/notes", notesRoutes);
router.use("/video", videoRoutes);
router.use("/quizz", quizzRoutes);
router.use("/result", resultRoutes);

// Engagement & Ops
router.use("/announcement", announcementRoutes);
router.use("/event", eventRoutes);
router.use("/comment", commentRoutes);
router.use("/like", likeRoutes);
router.use("/fees", feesRoutes);

// New Modules
router.use("/admin", adminRoutes);
router.use("/exams", examRoutes);
router.use("/academic-records", academicRecordRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/library", libraryRoutes);
router.use("/transport", transportRoutes);
router.use("/scholarship", scholarshipRoutes);
router.use("/payroll", payrollRoutes);
router.use("/sections", sectionRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/timetable", timetableRoutes);
router.use("/settings", settingsRoutes);
router.use("/timetable-settings", timetableSettingsRoutes);
router.use("/attendance-rules", attendanceRuleRoutes);
router.use("/hostel", hostelRoutes);
router.use("/visitor", visitorRoutes);
router.use("/leave", leaveRoutes);

export default router;
