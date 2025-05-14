import { models } from "@/models";

export class classService{
    private classModel = models.Class;
    async getAllClasses(schoolId:string){
        return await this.classModel.find({isDeleted:false , school:schoolId}).populate('school');
    }
    async getClassById(id:string){
        return await this.classModel.findById(id);
    }
    async createClass(data:any){
        return await this.classModel.create(data);
    }
    async updateClass(id:string,data:any){
        return await this.classModel.findByIdAndUpdate(id,data);
    }
    async deleteClass(id:string){
        return await this.classModel.findByIdAndUpdate(id,{isDeleted:true});
    }
}