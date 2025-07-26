"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, BookOpen, Clock, Hash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Course {
  id: string
  title: string
  code: string
  credits: number
  instructor: string
  time: string
  location: string
}

interface Semester {
  id: string
  name: string
  year: number
  courses: Course[]
}

export default function CoursePlanner() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "fall2024",
      name: "Fall",
      year: 2024,
      courses: [
        {
          id: "cs101",
          title: "Introduction to Computer Science",
          code: "CS 101",
          credits: 3,
          instructor: "Dr. Smith",
          time: "MWF 10:00-11:00",
          location: "Room 201",
        },
        {
          id: "math201",
          title: "Calculus II",
          code: "MATH 201",
          credits: 4,
          instructor: "Prof. Johnson",
          time: "TTh 2:00-3:30",
          location: "Room 105",
        },
      ],
    },
    {
      id: "spring2025",
      name: "Spring",
      year: 2025,
      courses: [
        {
          id: "cs201",
          title: "Data Structures",
          code: "CS 201",
          credits: 3,
          instructor: "Dr. Brown",
          time: "MWF 1:00-2:00",
          location: "Room 301",
        },
      ],
    },
    {
      id: "fall2025",
      name: "Fall",
      year: 2025,
      courses: [],
    },
    {
      id: "spring2026",
      name: "Spring",
      year: 2026,
      courses: [],
    },
    {
      id: "fall2026",
      name: "Fall",
      year: 2026,
      courses: [],
    },
    {
      id: "spring2027",
      name: "Spring",
      year: 2027,
      courses: [],
    },
    {
      id: "fall2027",
      name: "Fall",
      year: 2027,
      courses: [],
    },
    {
      id: "spring2028",
      name: "Spring",
      year: 2028,
      courses: [],
    },
  ])

  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    title: "",
    code: "",
    credits: 3,
    instructor: "",
    time: "",
    location: "",
  })

  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addCourse = () => {
    if (!selectedSemester || !newCourse.title || !newCourse.code) return

    const courseId = `${newCourse.code.toLowerCase().replace(/\s+/g, "")}-${Date.now()}`
    const course: Course = {
      ...newCourse,
      id: courseId,
    }

    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === selectedSemester ? { ...semester, courses: [...semester.courses, course] } : semester,
      ),
    )

    setNewCourse({
      title: "",
      code: "",
      credits: 3,
      instructor: "",
      time: "",
      location: "",
    })
    setSelectedSemester("")
    setIsDialogOpen(false)
  }

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: semester.courses.filter((course) => course.id !== courseId) }
          : semester,
      ),
    )
  }

  const getTotalCredits = (courses: Course[]) => {
    return courses.reduce((total, course) => total + course.credits, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Planner</h1>
          <p className="text-gray-600">Plan your academic schedule by semester</p>
        </div>

        <div className="mb-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.id} value={semester.id}>
                          {semester.name} {semester.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., CS 101"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, code: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Computer Science"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    max="6"
                    value={newCourse.credits}
                    onChange={(e) =>
                      setNewCourse((prev) => ({ ...prev, credits: Number.parseInt(e.target.value) || 3 }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    placeholder="e.g., Dr. Smith"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, instructor: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    placeholder="e.g., MWF 10:00-11:00"
                    value={newCourse.time}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Room 201"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <Button onClick={addCourse} className="w-full">
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
            {semesters.map((semester) => (
              <div key={semester.id} className="flex-none w-80 snap-start">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {semester.name} {semester.year}
                    </h2>
                    <Badge variant="secondary" className="text-sm">
                      {getTotalCredits(semester.courses)} credits
                    </Badge>
                  </div>

                  {semester.courses.length === 0 ? (
                    <Card className="border-dashed h-64">
                      <CardContent className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No courses added yet</p>
                          <p className="text-sm text-gray-400">Add your first course to get started</p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {semester.courses.map((course) => (
                        <Card key={course.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Hash className="w-3 h-3" />
                                    {course.code}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {course.credits} credits
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCourse(semester.id, course.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2 text-sm">
                              {course.instructor && (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-700">Instructor:</span>
                                  <span className="text-gray-600">{course.instructor}</span>
                                </div>
                              )}
                              {course.time && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3 h-3 text-gray-500" />
                                  <span className="text-gray-600">{course.time}</span>
                                </div>
                              )}
                              {course.location && (
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-700">Location:</span>
                                  <span className="text-gray-600">{course.location}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {semesters.map((semester, index) => (
              <div
                key={semester.id}
                className="w-2 h-2 rounded-full bg-gray-300"
                title={`${semester.name} ${semester.year}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  )
}
