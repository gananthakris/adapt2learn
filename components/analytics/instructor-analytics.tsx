'use client';

import { useState } from 'react';
import type { InstructorState, StudentProgress, SkillGap } from "@/lib/types";
import { ClassSelector } from './class-selector';
import { ClassOverviewCards } from './class-overview-cards';
import { SkillGapAnalysis } from './skill-gap-analysis';
import { StudentsTable } from './students-table';
import { QuickActions } from './quick-actions';
import { AtRiskStudents } from './at-risk-students';
import { StudentDetailModal } from './student-detail-modal';
import { SkillGapDrilldown } from './skill-gap-drilldown';
import { AnnouncementModal } from './announcement-modal';
import { AssignmentModal } from './assignment-modal';

export function InstructorAnalytics({ state }: { state: InstructorState }) {
  const [currentClass, setCurrentClass] = useState(state.currentClass);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [selectedSkillGap, setSelectedSkillGap] = useState<SkillGap | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  // In future: fetch data based on currentClass
  // For now: use the seed data as-is

  const currentClassName = state.availableClasses.find(c => c.id === currentClass)?.name || 'Unknown Class';

  const handleStudentClick = (student: StudentProgress) => {
    setSelectedStudent(student);
  };

  const handleAtRiskStudentClick = (studentId: string) => {
    const student = state.students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
    }
  };

  return (
    <>
      <section className="space-y-8">
        {/* Header with class selector */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <h1>
            <span className="gradient-text">Instructor Dashboard</span>
          </h1>

          <ClassSelector
            currentClass={currentClass}
            availableClasses={state.availableClasses}
            onClassChange={setCurrentClass}
          />
        </div>

        {/* 4-card overview */}
        <ClassOverviewCards stats={state} />

        {/* At-risk students section */}
        <AtRiskStudents
          students={state.atRiskStudents}
          onStudentClick={handleAtRiskStudentClick}
        />

        {/* Skill gap analysis */}
        <SkillGapAnalysis
          skillGaps={state.skillGaps}
          onSkillClick={setSelectedSkillGap}
        />

        {/* Students table */}
        <StudentsTable
          students={state.students}
          onStudentClick={handleStudentClick}
        />

        {/* Quick actions */}
        <QuickActions
          state={state}
          onCreateAssignment={() => setShowAssignmentModal(true)}
          onSendAnnouncement={() => setShowAnnouncementModal(true)}
        />
      </section>

      {/* Modals */}
      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      <SkillGapDrilldown
        skillGap={selectedSkillGap}
        students={state.students}
        onClose={() => setSelectedSkillGap(null)}
      />

      <AnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        className={currentClassName}
        totalStudents={state.totalStudents}
      />

      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        className={currentClassName}
      />
    </>
  );
}
