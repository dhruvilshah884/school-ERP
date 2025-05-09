import { models } from "@/models";

export class parentService{
    private parentModel = models.Parent;
    public async createParent(parent:any){
        const newParent = await this.parentModel.create(parent)
        return newParent;
    }
    public async getParent(){
        const parent = await this.parentModel.find({isDeleted:false}).populate('user_id').populate('student_id').populate('school');
        return parent;
    }
    public async getParentById(id:any){
        const parent = await this.parentModel.findById(id).populate('user_id').populate('student_id').populate('school');
        return parent;
    }
    public async updateParent(id:any,parent:any){
        const updateParent = await this.parentModel.findByIdAndUpdate(id,parent,{new:true});
        return updateParent;
    }
    public async deleteParent(id:any){
        const deleteParent = await this.parentModel.findByIdAndUpdate(id,{isDeleted:true},{new:true});
        return deleteParent;
    }
}