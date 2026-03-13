import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Model } from 'mongoose';
import { Course } from 'src/shemas/course.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private CourseModal: Model<Course>) {}
  async create(createCourseDto: CreateCourseDto) {
    await this.CourseModal.create({
      name:createCourseDto.name,
      level:createCourseDto.level,
      price:createCourseDto.price,
      description:createCourseDto.description,
    })
    return 'This action adds a new course';
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
